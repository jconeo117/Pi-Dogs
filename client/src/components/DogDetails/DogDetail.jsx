import React, { useEffect } from "react";
import Nav from "../navbar/Navbar";
import style from '../DogDetails/DogDetail.module.css'
import { useDispatch, useSelector } from "react-redux";
import { ClearDetail, getDetails } from "../../redux/actions";
import { useParams } from "react-router-dom";

export default function DogDetail(){
    const dispatch = useDispatch()
    let {id} = useParams()
    
    useEffect(()=>{
        dispatch(getDetails(id))
        return dispatch(ClearDetail())
    },[dispatch,id])

    const details = useSelector((state)=>state.details)
    console.log(details)
    

    return(
        <div className={style.container}>
            <Nav/>
            {
                Object.keys(details).length?
            <div className={style.container_detail}>
                <div>
                    <img src={details[0].image} alt="" />
                    <h3>{details[0].name}</h3>
                    <hr />
                    <div className={style.info}>
                        <div>
                            <h3>peso</h3>
                            <p>{`${details[0].weight[0]} - ${details[0].weight[1]} Kgs`}</p>
                        </div>
                        <div>
                            <h3>altura</h3>
                            <p>{`${details[0].height[0]} - ${details[0].height[1]} Cm's`}</p>
                        </div>
                        <div>
                            <h3>esperanza de vida</h3>
                            <p>{`${details[0].life}`}</p>
                        </div>
                        <div>
                            <h3>temperamentos</h3>
                            {details[0].temperament?
                            <p>{`${details[0].temperament.join(', ')} `}</p>:
                            <p>no se encontraron temperamentos</p>
                            }
                        </div>
                    </div>
                </div>
            </div>:
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