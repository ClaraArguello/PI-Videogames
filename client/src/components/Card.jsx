import React from "react";


export default function Card({name, image, genres}){
    return(
        <div>
            <h3>Name: {name}</h3>
            <h5>{genres.join(" | ")}</h5>
            <img src={image} alt='' width='200px' />
        </div>
    );
}