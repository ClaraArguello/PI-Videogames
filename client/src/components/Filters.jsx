import React, { useEffect, useState } from 'react'
import { applyFilters, getGenres, sortBy } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

function Filters({paginate}) {
    
    const dispatch = useDispatch();
    const genre = useSelector(state => state.genres);
    console.log(genre)

    const [ filters, setFilters] = useState({
        origin:'all',
        genre:'all',
    });
    const [ order, setOrder ] = useState('not order');

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
        setOrder('not order')
    }

    function handleChangeOrder(e){
        e.preventDefault();
        setOrder(e.target.value)
        dispatch(sortBy(e.target.value))
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
            <label>Order:</label>
            <select value={order} onChange={(e) => handleChangeOrder(e)}>
                <option value="not order">Not order</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="r1-10">Rating lowest to highest</option>
                <option value="r10-1">Rating highest to lowest</option>
            </select>
        </form>


    </div>
  )
}

export default Filters