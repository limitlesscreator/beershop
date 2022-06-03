import React from 'react';
import s from './Card.module.css'

export const Card = (props) => {
    return (
        <div className={s.card}>
            {props.beers.name}
            <img src={props.beers.image_url} alt={props.beers.name}/>
            <div>{props.priceOfBeer(props.beers.abv)} ₽</div>

        </div>
    );
};
