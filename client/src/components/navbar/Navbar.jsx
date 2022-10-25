import React, { useState } from "react";
import style from '../navbar/navbar.module.css'
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getBreed } from "../../redux/actions";


export default function Nav(){

    const [search,setSearch] = useState("")
    const dispatch = useDispatch()

    const handleInput = (e) => {
        if(!/^[a-zA-Z]*$/.test(e.target.value)){
            e.preventDefault()
            alert('The search can not contain numbers or special caracters')
        }
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handeSubmit = (e)=>{
        e.preventDefault()
        dispatch(getBreed(search))
        setSearch('')
    }


    return(
        <div className={style.container}>
            <div className={style.icon}>
                <Link to='/'>
                <img src="https://i0.wp.com/imagenesparapeques.com/wp-content/uploads/2017/08/Personajes-Puppy-Dogs-Palls.png?resize=300%2C300" alt="img not found" />
                 <p>Doggys App</p>
                </Link>
            </div>
            <div>
                <form onSubmit={handeSubmit}>
                    <input className={style.input} 
                    type="text" 
                    placeholder="Search..." 
                    onChange={handleInput} 
                    value={search}/>
                </form>
            </div>
            <ul>
                <li><Link to='/home'>inicio</Link></li>
                <li><Link to='/dog'>crear perro</Link></li>
                {/* <li><Link>about</Link></li> */}
            </ul>
        </div>
    )
}