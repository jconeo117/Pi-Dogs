import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getTemperaments } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import style from '../Cards/cards.module.css'

export default function Cards({currentDog}){
    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    },[dispatch])
    return(
        <div className={style.container}>
            {Object.keys(currentDog).length?
                currentDog?.map(el=>{
                    return(
                    <div key={el.id}>
                    <Link to={"/dog-detail/"+el.id}>
                        <Card image={el.image}
                         name={el.name}
                        temperament={el.temperament? el.temperament.join(', '):'no se encontraron temperamentos'} 
                        weight={el.weight}
                        />
                    </Link>
                    </div>
                )
            }):
            <div className={style.loading}>
                <div className={style.spinner}>
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            </div>
            }
        </div>
    )
}