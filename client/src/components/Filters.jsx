import React, { useEffect, useState } from 'react'
import { applyFilters, getGenres, sortBy } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import s from '../styles/Filters.module.css';

function Filters({paginate}) {
    
    const dispatch = useDispatch();
    const genre = useSelector(state => state.genres);

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
        dispatch(sortBy(e.target.value));
        paginate(1);
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

  return (
    <div>
        <form className={s.filters} onSubmit={(e)=> handleSubmit(e)}>
            <label className={s.label}>Origin:</label>
            <select className={s.select} onChange={e => handleOnChange(e)} value={filters.origin} id='origin'>
                <option value="all">All</option>
                <option value="api">Existing</option>
                <option value="created">Created</option>
            </select>
            <label className={s.label}>Genres:</label>
            <select className={s.select} onChange={e => handleOnChange(e)} value={filters.genre} id='genre'>
                <option value="all">All</option>
                
                {genre&&genre.map(g =>(
                    <option value={g.name} key={g.name}>{g.name}</option>
                    ))}
            </select>
            <button className={s.btn} type='submit'>{filters.origin === 'all' && filters.genre === 'all'? 'Refresh':'Apply Filters'}</button>
            <label className={s.label}>Order:</label>
            <select className={s.select} value={order} onChange={(e) => handleChangeOrder(e)}>
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