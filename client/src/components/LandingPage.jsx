import React from "react";
import { Link } from 'react-router-dom';
import s from '../styles/LandingPage.module.css';

export default function LandingPage(){
    return (
        <div className={s.landing}>
            <div className={s.landingBox}>
                <h1 className={s.title}>Videogames</h1>
                <Link to='/videogames'>
                    <button className={s.btn}>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}