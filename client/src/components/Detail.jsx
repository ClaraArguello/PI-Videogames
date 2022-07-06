import React,{ useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { clearDetail, getDetail } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import s from '../styles/Detail.module.css';

export default function Detail(props){
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const myVideogame = useSelector((state) => state.detail);
    
    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(clearDetail())
        }
    },[dispatch]);
    console.log(myVideogame)

    return(
       <div>
        <Link to='/videogames'>
            Go back
        </Link>
        {
            myVideogame.name?
            <div>
                <h1>{myVideogame.name}</h1>
                <img src = {myVideogame.image} />
                <h4>Description: {myVideogame.description}</h4>
                <h4>Release date: {myVideogame.released}</h4>
                <h4>Rating: {myVideogame.rating}</h4>
                <h4>Genres: {myVideogame.createdInDb? myVideogame.genres.map(g=> g.name + (' | '))
                    :
                    myVideogame.genres.map(g => g + (' | '))}</h4>
                <h4>Platforms: {myVideogame.platforms.map(p => p + (' | '))}</h4>

            </div>
            :
            <div className={s.loader}> </div>
        }
       </div>
    )

}