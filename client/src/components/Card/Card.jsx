import React from "react";
import style from'../Card/Card.module.css'


export default function Card({ image, name, temperament, weight}) {
  return (
    <div className={style.card_container}>
      <div className={style.image_container}>
        <img src={`${image}`} alt={`image for ${name}`} />
      </div>
      <div className={style.card_name}>
        <h3>{name}</h3>
        <p><b>peso:</b>{` ${weight[0]} - ${weight[1]} kgs`}</p>
        <div>
          <p> <b>temperamentos:</b></p>
          <p>{`${temperament}`}</p>
        </div>
      </div>
    </div>
  );
}
