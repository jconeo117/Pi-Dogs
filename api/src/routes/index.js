const app  = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const GetApiInfo = async()=>{ //traemos la informacion de la api y guardamos las propiedades que vayamos a usar
    const ApiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const ApiInfo = await ApiUrl.data.map(el=>{

        let temperamentArray = [];//convertimos los temperamentos en array 
        if (el.temperament) {temperamentArray = el.temperament.split(", ");}
        
        let heightArray = [];//convertimos la altura en array 
        if (el.height.metric) {heightArray = el.height.metric.split(" - ");}
        
        let weightArray = [];//convertimos el peso en array 
        if (el.weight.metric) {weightArray = el.weight.metric.split(" - ");}
     
        return{
            id:el.id,
            name:el.name,
            weight:weightArray,
            height:heightArray,
            life:el.life_span,
            temperament:temperamentArray,
            image: el.image.url
        }
    })
   return ApiInfo
}


const GetDbInfo = async ()=>{//traemos informacion de la DataBase
   let dogDB = await Dog.findAll({
        include:{
            model:Temperament,
            attributes:['name'],//atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through:{
                attributes:[],//traer mediante los atributos del modelo
            }
        },
    })
    dogDB = dogDB.map(el=>{
        return{
            id:el.id,
            name:el.name,
            weight:el.weight,
            height:el.height,
            life:el.life,
            image: el.image,
            CreatedInDb:el.CreatedInDb,
            temperament:el.temperaments.map(temp=>{return temp.name})
        }
    })
    return dogDB
}

//conbinamos la info de ambas funciones
const GetAllDogs = async ()=>{
    const ApiInfo = await GetApiInfo();
    const DbInfo = await GetDbInfo();
    const TotalInfo = [...ApiInfo,...DbInfo]
    // concatenamos la informacion de ambas en un solo arreglo y lo retornamos
    return TotalInfo
}

//-------------------------------------------------------
//-------------------EndPoints---------------------------
//-------------------------------------------------------

app.get('/dogs', async (req,res)=>{//esta funcion get tambien puede recibir nombre por query
    const {name} = req.query
    const DogsTotal = await GetAllDogs();
    if(name){
        const DogName = DogsTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
        //si el perro existe, lo guardamos en la variable
        if(DogName){
            return res.status(200).send(DogName)
        }else{
            return res.status(404).send('raza no encontrada')
        }
    }
    //si no recibe nombre por parametros le devolvemos todos los perros disponibles
   return res.status(200).send(DogsTotal)

})
app.get('/dogs/:idRaza', async(req,res)=>{
    const { idRaza } = req.params;
    const allDogs = await GetAllDogs();
    const dog = allDogs.filter(el => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("el perro no ha sido encontrado");
    }
})

app.get('/temperaments',async (req,res)=>{
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
   
})

app.post('/dogs',async (req,res)=>{
    let{//guardamos todos los parametros recibidos por body
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        CreatedInDb,
        life,
        temperament,
        image
    }=req.body

    const HeightArr = []//declaramos un array para guardar la altura maxima y minima recibida del perro
    const minHeight = min_height;
    const maxHeight = max_height;
    HeightArr.push(minHeight, maxHeight)
 
    const WeightArr = []//declaramos un array para guardar el peso maximo y minimo recibida del perro
    const minWeight = min_weight;
    const maxWeight = max_weight;
    WeightArr.push(minWeight, maxWeight)

    let dogExist = await Dog.findOne({
        where:{name:name}
    })

    if(dogExist){
        return res.status(404).send('el perro ya existe')
    }

    let DogCreated = await Dog.create({//creamos el perro con los parametros antes recibidos
        name,
        height: HeightArr,
        weight: WeightArr,
        life,
        CreatedInDb,
        image: image ? image : "https://image.shutterstock.com/image-vector/cartoon-illustration-german-shepherd-dog-260nw-398480701.jpg",
    })

    let TemperamentsDb = await Temperament.findAll({
        //buscamos en la DataBase todos los temperamentos que coincidan con los temperamentos recibidos por body
        where:{ name:temperament}
        
    })

    DogCreated.addTemperament(TemperamentsDb)
    //al perro creado anteriormente le agregamos los temperamentos encontrados en la DataBase
    res.send('El perro ha sido creado con exito!!')
})

module.exports = app;
