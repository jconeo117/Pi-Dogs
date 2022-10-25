import React from "react";
import style from '../paginate/paginate.module.css'

export default function Paginado({dogsPage,allDogs, paginado}){

    const pageNumber=[]

    for(let i=1; i<= Math.ceil(allDogs/dogsPage);i++){
        pageNumber.push(i)
    }

    return(
        <div className={style.b_pagination_outer}>
            <ul className={style.border_pagination}>
               {pageNumber.length?
               pageNumber.map(num=>{
                return(
                <li key={num}>
                   <a onClick={()=>paginado(num)}>{num}</a>
                </li>
                )
               }):<></>
                }
            </ul>
        </div>
    )
}