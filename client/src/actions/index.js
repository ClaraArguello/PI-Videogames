import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: 'GET_GENRES',
            payload: info.data
        })
    }
}

export function postVideogame(payload){
    return async function(){
        try {
            const response = await axios.post('http://localhost:3001/videogames',payload);
            alert('Videogame created');
        } catch (error) {
            alert(error.message);
        }
    }
}

export function getVideogameName(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: 'GET_VIDEOGAME_NAME',
                payload: json.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDetail (id){
    return async function (dispatch){
        var json = (await axios.get(`http://localhost:3001/videogames/${id}`)).data;
        return dispatch({
            type: 'GET_DETAILS',
            payload: json
        })
    }
}

export function getAllPlatforms(){
    return async function(dispatch){
        try {
            var response = (await axios.get(`http://localhost:3001/platforms`)).data;
            return dispatch({
                type: 'GET_PLATFORMS',
                payload: response
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function clearDetail (){
    return function(dispatch){
        return dispatch({
            type: 'CLEAR_DETAIL'
        })
    }
}

export function pagination(page){
    return function(dispatch){
        dispatch({
            type:'CURRENT_PAGE',
            payload: page
        })
    }
}

export function filterOrigin(filter){
    return function(dispatch){
        dispatch({
            type:'FILTER_VIDEOGAME',
            payload: filter
        })
    }
}

export function filtersGenre (filter){
    return function(dispatch){
        dispatch({
            type:'FILTER_GENRE',
            payload: filter
        })
    }
}

export function applyFilters (filters){
    return function(dispatch){
        if(filters.origin)dispatch(filterOrigin(filters.origin));
        if(filters.genre !== 'all')dispatch(filtersGenre(filters.genre));
    }
}

export function sortBy(order){
    return function(dispatch){
        dispatch({
            type: 'SORT',
            payload: order
        })
    }
}