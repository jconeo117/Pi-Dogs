import React from "react";
import Cards from "../Cards/Cards";
import Filtro from "../Filtro/Filtro";
import style from '../Home/home.module.css'
import Nav from "../navbar/Navbar";
import { useState } from "react";
import Paginado from "../paginate/Paginate";
import { useSelector } from "react-redux";

export default function Home(){

    const [, setOrden] = useState("");
    const allDogs = useSelector((state)=>state.dogs)
    const dogsPage = 8
    const [currentpage, setCurrentpage] = useState(1)
    const indexLastDog = currentpage * dogsPage
    const indexFirstDog = indexLastDog - dogsPage
    const currentDog = allDogs.slice(indexFirstDog, indexLastDog)

    const paginado=(pageNumber)=>{
        setCurrentpage(pageNumber)
        console.log('paginado:', pageNumber)
    }

    return(
        <div>
           <div>
                <Nav/>
           </div>
           <div className={style.paginate}>
                <Paginado
                dogsPage={dogsPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
           </div>
            <div className={style.container}>
                <Filtro set={setOrden}/>
                <Cards currentDog={currentDog}/>
            </div>
            <div className={style.paginate_end}>
                <Paginado
                dogsPage={dogsPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
            </div>
        </div>
    )
}