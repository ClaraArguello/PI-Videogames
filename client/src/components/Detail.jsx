import React,{ useEffect } from "react";
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch]);

    return(
       <div>
        
        {
            myVideogame.name?
            <div className={s.card}>
                <div className={s.container}>
                    <div className={s.firstLine}>
                        <div className={s.link}>
                            <Link to='/videogames' className={s.btn}>
                                Go back
                            </Link>
                        </div>
                        <div className={s.text}>
                            <h1 className={s.title}>{myVideogame.name}</h1>
                        </div>
                    </div>
                    <img src = {myVideogame.image} className={s.img} alt=''/>
                    <br />
                    <h4>RELEASE DATE: {myVideogame.released}</h4>
                    <br />
                    <h4>RATING: {myVideogame.rating}</h4>
                    <br />
                    <h4>GENRES: {myVideogame.createdInDb? myVideogame.genres.map(g=> g.name + (' | '))
                        :
                        myVideogame.genres.map(g => g + (' | '))}</h4>
                    <br />
                    <h4>PLATFORMS: {myVideogame.platforms.map(p => p + (' | '))}</h4>
                    <br />
                    <h4>DESCRIPTION: {myVideogame.description}</h4>
                </div>
            </div>
            :
            <div  className={s.load}>
                <div className={s.loader}> </div>
            </div>
        }
       </div>
    )

}