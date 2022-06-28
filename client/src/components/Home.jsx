import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";

export default function Home(){

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);

    useEffect(()=>{
        dispatch(getVideogames());
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    return(
        <div>
            <Link to='./videogame'>Create videogame</Link>
            <button onClick={e => {handleClick(e)}}>Reload videogames</button>
            {allVideogames?.map(el =>{
                return (
                    <div key={el.id}>
                        <Link to={'/home/' +el.id}>
                            <Card key={el.id} name={el.name} image={el.image} genres={el.genres}  />
                        </Link>
                    </div>
            );
            })}
        </div>
    )
}