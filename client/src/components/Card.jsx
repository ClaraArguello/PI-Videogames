import React from "react";
import s from '../styles/Card.module.css'


export default function Card({name, image, genres}){
    
    return(
        <div className={s.card}>
            <div className={s.text}>
                <h3 className={s.title}>{name}</h3>
                <h5> {genres && genres.join(' | ')}</h5>
            </div>
            <img src={image} alt='' width='200px'/>
        </div>
    );
}