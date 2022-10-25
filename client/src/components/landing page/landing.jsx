import React from "react";
import {Link} from 'react-router-dom'
import style from '../landing page/landing.module.css'


export default function Landing(){
    return(
        <div className={style.container}>
            <div className={style.image_container}>
                <img src="https://i0.wp.com/imagenesparapeques.com/wp-content/uploads/2017/08/Personajes-Puppy-Dogs-Palls.png?resize=300%2C300" alt="img not found" />
            </div>
            <div className={style.btn_shine}>
                <h3 >Bienvenidos</h3>
                <h3 >a</h3>
                <h3 >Doggys Info App</h3>
            </div>
            <p>web app desarrollada por Junior Coneo</p>
            <Link to='/home'>
            <button className={style.btn}>ingresa ya</button>
            </Link>            
        </div>
    )
}