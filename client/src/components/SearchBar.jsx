import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { getVideogameName } from "../actions";
import s from '../styles/SearchBar.module.css';
import fcPng from '../img/searchFCPNG.png';

export default function SearchBar (){
    const dispatch = useDispatch();

    const [ name,setName ] = useState('');

    const handleInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getVideogameName(name));
        setName('');
    }

    return(
        <form className={s.searchBar} onSubmit={(e) => handleSubmit(e)}>
            <input 
                type="text"
                placeholder="Search"
                onChange={(e) => handleInputChange(e)}
                className={s.search}
                value={name}
            />
            <button type="submit" className={s.btn}><img src={fcPng} alt='' className={s.img}/></button>
        </form>
    )
}