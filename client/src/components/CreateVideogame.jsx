import React,{ useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import s from '../styles/CreateVideogame.module.css';
import { getAllPlatforms } from "../actions";

export default function CreateVideogame(){
    const dispatch = useDispatch();
    const genre = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms);
    const allNames = useSelector(state => state.videogames)

    const [ input, setInput] = useState ({
        name: '',
        description: '',
        released: '',
        rating: '',
        image:'',
        genres:[],
        platforms: [],
    });

    const [ errors, setErrors ] = useState({
        name:'',
        description:'',
        rating:'',
        image:'',
        genres:'',
        platforms:'',
    });

    const [ change, setChange ] = useState(false);
    

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getAllPlatforms());
    }, [dispatch]);

    useEffect(() => {
        change && validate()
    },[input])


    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setChange(true);
    }

    const handleSelectGenres = (e) => {
        if(input.genres.length < 3 && !input.genres.includes(e.target.value)){
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            });
        }
    }

    const handleSelectPlatforms = (e) => {
        if(input.platforms.length < 3 && !input.platforms.includes(e.target.value)){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            });
        }
    }
    
    const handleDelete = (g, name) => {
        setInput({
            ...input,
            [name]: input[name].filter(gen => gen !== g)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let noRepeat = allNames.filter(n => n.name === input.name)
        if(noRepeat.length !== 0) {
            alert('Ya existe un juego con ese nombre, por favor elija otro');
        }else{
            dispatch(postVideogame(input));
            alert('Videogame created successfully');
        }
        setInput({
            name: '',
            description: '',
            released: '',
            rating: '',
            genres:[],
            platforms: [],
        })

    }

    
    let noEmpty = /\S+/;
    let validateName = /^.{5,100}$/;
    let validateUrl = /(https?:\/\/.*\.(?:png|jpg))/i;  
    let validateWords = /^.{5,200}$/;

    const validate = () => {
        if (
            !noEmpty.test(input.name) ||
            !validateName.test(input.name) ||
            input.name.length < 5
        ) {
            return setErrors({name: "Name required. more than 5 characters"})
        }
        if (
          !validateWords.test(input.description) ||
          parseInt(input.description) < 1 ||
          !noEmpty.test(input.description)
        ) {
          return setErrors({description:
            "Description required. Between 5 and 200 characters"})
        }
        if (input.rating < 1 || input.rating > 10 || !noEmpty.test(input.rating) ) {
            return setErrors({rating: "Number required. Between 1 and 10"})
        }
        if(input.image){
            if (!validateUrl.test(input.image)) {
              return setErrors({image: "URL required"})
            }
        }
        if(input.genres.length < 1){
            return setErrors({genres: "Select at least 1 genre"})
        }
        if(input.platforms.length < 1){
            return setErrors({platforms: "Select at least 1 platform"})
        }
        setErrors({
            ...errors,
            name:'',
            description:'',
            rating:'',
            image:'',
            genres:'',
            platforms:'',  
        })
    };


    return(
        <div className={s.create}>
        <div className={s.createBox}>
            <div className={s.title}>
                <Link to='/videogames'><button className={s.btn}>Go back</button></Link>
                <h1 className={s.text}>Create your videogame</h1>
            </div>
            <form onSubmit={e => handleSubmit(e)} className={s.form}>
                <div className={s.item}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)}
                        className={s.input}
                        placeholder='Name'
                    />
                    <div>
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>
                </div>
                <div className={s.item}>
                    <label>Description:</label>
                    <input 
                        type="text" 
                        value={input.description}
                        name='description'
                        onChange={e => handleChange(e)}
                        className={s.input}
                        placeholder='Description'
                    />
                    <div>
                        {errors.description && (
                            <p>{errors.description}</p>
                        )}
                    </div>
                </div>
                <div className={s.item}>
                    <label>Release date:</label>
                    <input 
                        type="date" 
                        value={input.released}
                        name='released'
                        onChange={e => handleChange(e)}
                        className={s.input}
                    />
                    <div>
                        {errors.released && (
                            <p>{errors.released}</p>
                        )}
                    </div>
                </div>
                <div className={s.item}>
                    <label>Rating:</label>
                    <input 
                        type="number" 
                        step='0.1'
                        value={input.rating}
                        name='rating'
                        min={1}
                        onChange={e => handleChange(e)}
                        className={s.input}
                        placeholder='Rating'
                    />
                    <div>
                        {errors.rating && (
                            <p>{errors.rating}</p>
                        )}
                    </div>
                </div>
                <div className={s.item}>
                    <label>Image:</label>
                    <input 
                        type="text" 
                        value={input.image}
                        name='image'
                        onChange={e => handleChange(e)}
                        className={s.input}
                        placeholder='Image'
                    />
                    <div>
                        {errors.image && (
                            <p>{errors.image}</p>
                        )}
                    </div>
                </div>
                <div className={s.item}>
                    <div className={s.dropdown}>    
                        <div className={s.top}>
                            <label>Genres: (max 3)</label>
                            <select onChange={e => handleSelectGenres(e)} className={s.select} disabled={input.genres.length === 3?true:false}>
                                {genre.map(g=>(
                                    <option key={g.id}value={g.name}>{g.name}</option>
                                    ))}
                            </select>  
                        </div>
                        <div>
                            {errors.genres && (
                                <p>{errors.genres}</p>
                            )}
                        </div>
                        <div className={s.bottom}>
                            {input.genres.map((g,i) => (
                                <div key={i++} className={s.selected}>
                                    <p className={s.selName}>{g}</p>
                                    <div id='genres' onClick={(e) => handleDelete(g,e.target.id)} className={s.selX}>x</div>
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>
                <div className={s.item}>
                    <div className={s.dropdown}>
                        <div className={s.top}>
                            <label>Platforms: (max 3)</label>
                            <select onChange={e => handleSelectPlatforms(e)} className={s.select} disabled={input.platforms.length === 3?true:false}>
                                {platforms.map((p,i)=>(
                                    <option key={i++}value={p}>{p}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            {errors.platforms && (
                                <p>{errors.platforms}</p>
                            )}
                        </div>
                        <div className={s.bottom}>
                            {input.platforms.map((p,i) => (
                                <div key={i++} className={s.selected}>
                                    <p className={s.selName}>{p}</p>
                                    <div id='platforms' onClick={(e) => handleDelete(p,e.target.id)} className={s.selX}>x</div>
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>
                  
                <div className={s.btnCreate}>
                    <button type='submit' className={s.btn} disabled={
                        errors.name ||
                        errors.description||
                        errors.released|| 
                        errors.rating|| 
                        errors.image|| 
                        errors.genres|| 
                        errors.platforms|| 
                        !input.name|| 
                        !input.description|| 
                        !input.rating|| 
                        !input.genres|| 
                        !input.platforms?
                        true:false}
                        >Create!</button>
                </div>
            </form>
           
        </div>
        </div>
    )
}