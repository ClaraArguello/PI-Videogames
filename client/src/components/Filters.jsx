import React, { useEffect, useState } from 'react'
import { applyFilters, getGenres } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

function Filters({paginate}) {
    
    const dispatch = useDispatch();
    const genre = useSelector(state => state.genres);

    const [ filters, setFilters] = useState({
        origin:'all',
        genre:'all',
    });

    function handleOnChange(e){
        e.preventDefault();
        const { id, value }= e.target;
        setFilters({...filters,[id]:value})
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(applyFilters(filters));
        paginate(1);
        setFilters({
            origin:'all',
            genre:'all',
        })
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

  return (
    <div>
        <form onSubmit={(e)=> handleSubmit(e)}>

        <label>Origin:</label>
        <select onChange={e => handleOnChange(e)} value={filters.origin} id='origin'>
            <option value="all">All</option>
            <option value="api">Existing</option>
            <option value="created">Created</option>
        </select>
        <label>Genres:</label>
        <select onChange={e => handleOnChange(e)} value={filters.genre} id='genre'>
            <option value="all">All</option>
            {genre&&genre.map(g =>(
                <option value={g.name}>{g.name}</option>
                ))}
        </select>
        <button type='submit'>Apply Filters</button>
        </form>
    </div>
  )
}

export default Filters