import React from "react";
import Nav from "../navbar/Navbar";
import style from '../DogCreated/dogCreated.module.css'
import validate from "../validate/validate";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTemperaments, postDog } from "../../redux/actions"; 


export default function DogCreated(){

    const allTemps = useSelector(state=>state.temperaments)
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        life: '',
        temperament: []
    })

    function handleDelete(e){
        setInput({
          ...input,
          temperament: input.temperament.filter((t) => t !== e)
        })
    }
    
    function handleSelect(e){
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }
    }
    
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value 
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(input))
        alert('Created succesfully')
        setInput({
          name: '',
          min_height: '',
          max_height: '',
          min_weight: '',
          max_weight: '',
          life: '',
          temperament: []
        })
    }
    
    const [button, setButton] = useState({})
    
    useEffect(() => {
        Object.keys(error).length? setButton(true) : setButton(false)
    }, [input])
    
    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])




    return(
        <div>
            <div>
                <Nav/>
            </div>
            <div className={style.container}>
                <div className={style.form_container}>
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                        <h1 >Crear perro</h1>

                        <div className='form-name'>
                            <input type="text" className={style.input} name="name" value={input.name} onChange={handleChange} placeholder='Name'/>
                        </div> 
                        { error.name && <p>{error.name}</p>} 

                        <div className='form-height'>
                            <input type="number" className={style.input} name="min_height"  value={input.min_height} onChange={handleChange} placeholder='Height min:'/>
                        </div>

                        {error.min_height && <p>{error.min_height}</p>}

                        <div className='form-height'>
                            <input type="number" className={style.input} name="max_height" value={input.max_height} onChange={handleChange} placeholder='Height max:'/>
                        </div>

                        {error.heightMax && <p>{error.heightMax}</p>}
                        {error.height && <p>{error.height}</p>}

                        <div className='form-weight'>
                            <input type="number" className={style.input} name="min_weight" value={input.min_weight} onChange={handleChange} placeholder='Weight min:' />
                        </div>

                        {error.weightMin && <p>{error.weightMin}</p>}

                        <div className='form-weight'>
                            <input type="number" className={style.input} name="max_weight" value={input.max_weight} onChange={handleChange} placeholder='Weight max: '/>
                        </div>

                        {error.weightMax && <p>{error.weightMax}</p>}
                        {error.weight && <p>{error.weight}</p>}

                        <div className='form-life-span'>
                            <input type="text" className={style.input} name="life" value={input.life} onChange={handleChange} placeholder='Life span: 1 - 2 years'/>
                        </div>

                        <div className={style.temps_cont}>
                            <div className={style.selectdiv}>    
                                <label>
                                    <select onChange={(e) => handleSelect(e)}>
                                        <option disabled selected defaultValue>Temperamentos</option>
                                        {allTemps?.map(temp => (
                                        <option value={temp.name}  key={temp.id}>{temp.name}</option>
                                        ))
                                        }
                                    </select>
                                </label>            
                            </div>

                            <div className={style.container_temps}>
                                {input.temperament.map((element, index) => (
                                <div className={style.temp_selected} key={index}>
                                    <div className={style.delete}>
                                        <p>{element}</p>
                                        <a onClick={() => handleDelete(element)}> X </a> 
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div> 

                        <div className='create-button'>
                            <button type="submit" disabled={button}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}