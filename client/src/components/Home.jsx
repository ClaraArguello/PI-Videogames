import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames,pagination } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import SearchBar from "./SearchBar";
import s from '../styles/Home.module.css';
import Pagination from "./Pagination";
import Filters from "./Filters";

export default function Home(){

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const currentPage = useSelector(state => state.currentPage);
    
    const [vgPerPage] = useState(15);
    const indexOfLastVg = currentPage * vgPerPage;
    const indexOfFirstVg = indexOfLastVg - vgPerPage;
    const currentVg = allVideogames.slice(
        indexOfFirstVg,
        indexOfLastVg
    );
    const paginate = (pageNumber) => dispatch(pagination(pageNumber));
    console.log(allVideogames)

    useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenres())
    },[dispatch]);

    return(
        <div className={s.home}>
            <div className={s.navBar}>
                <SearchBar />
                <Link to='/create' className={s.create}>Create videogame</Link>
            </div>
            <div className={s.paginate}>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1?true:false}>Prev</button>
                <Pagination gamesPerPage={vgPerPage} totalGames={allVideogames.length} paginate={paginate} className={s.pages} currentPage={currentPage}/>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentVg.length < 15?true:false}>Next</button>
            </div>
            <div>
                <Filters paginate={paginate}/>
            </div>
            <div className={s.cards}>
            {currentVg?currentVg.map(el =>{
                return (
                    <div className={s.card} key={el.id}>
                        <Link to={'/videogames/' +el.id} key={el.id} className={s.card}>
                            <Card key={el.id} name={el.name} image={el.image} genres={el.genres} />
                        </Link>
                    </div>
                );
            }) :
            <div className={s.loader}></div>
            }
        </div>
        </div>
    )
}