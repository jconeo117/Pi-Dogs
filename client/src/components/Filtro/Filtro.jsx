import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    OrderByName,
    OrderByWeight,
    OrderByHeight,
    FilterByTemperament,
    filterCreated
  } from "../../redux/actions";
import style from '../Filtro/filtro.module.css'

export default function Filtro({set}){

  const dispatch = useDispatch()
  const allTemps = useSelector(state=>state.temperaments)
  


  const handleClick = ()=>{
    window.location.reload(false);
  }


  const handleOrderByName = (e) => {
    e.preventDefault();    
    dispatch(OrderByName(e.target.value));
    set(`Ordenado ${e.target.value}`);
  };
  
  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    set(`Ordenado ${e.target.value}`);
  };

  const handleOrderByHeight = (e) => {
    e.preventDefault();
    dispatch(OrderByHeight(e.target.value));
    set(`Ordenado ${e.target.value}`);
  };

  const handleFilterByTemperament = (e) => {
    e.preventDefault();    
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleFilterByCreated =(e)=>{
    e.preventDefault()
    dispatch(filterCreated(e.target.value))
  }

  
    return(
        <div className={style.card}>

            <h3>Ordenado</h3>

            <div className={style.selectdiv}>
                <label>
                    <select onChange={handleOrderByName} name='alfabetico'>
                        <option disabled selected defaultValue> Orden Alfabetico </option>
                        <option value="A-Z">A - Z</option>
                        <option value="Z-A">Z - A</option>
                    </select>
                </label>
            </div>

            <div className={style.selectdiv}>
                <label>
                    <select onChange={handleOrderByWeight} name='peso'>
                        <option disabled selected defaultValue> Orden de Peso </option>
                        <option value="min_weight">Menor a Mayor</option>
                        <option value="max_weight">Mayor a Menor</option>
                    </select>
                </label>
            </div>

            <div className={style.selectdiv}>
                <label>
                    <select onChange={handleOrderByHeight} name='altura'>
                        <option disabled selected defaultValue> Orden de altura </option>
                        <option value="min_height">Menor a Mayor</option>
                        <option value="max_height">Mayor a Menor</option>
                    </select>
                </label>
            </div>

            <h3>Filtros</h3>

            <div className={style.selectdiv}>
                <label>
                    <select onChange={handleFilterByCreated} name='created'>
                        <option disabled selected defaultValue> creado/api </option>
                        <option value="all">todos</option>
                        <option value="created">creado en db</option>
                    </select>
                </label>
            </div>

            <div className={style.selectdiv}>    
                <label>
                  <select onChange={handleFilterByTemperament}>
                    <option disabled selected defaultValue>Temperamentos</option>
                    <option value="Todos">All</option>
                    {allTemps?.map(temp => (
                      <option value={temp.name}  key={temp.id}>{temp.name}</option>
                      ))
                    }
                  </select>
                </label>            
            </div>

            <div>
                <button onClick={e=>{handleClick(e)}}>Volver a Cargar</button>
            </div>
        </div>
    )
}