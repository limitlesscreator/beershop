import React, {useEffect, useState} from 'react';
import s from './Card.module.css'
import {Link} from 'react-router-dom'
export const Beer = (props) => {
    const [available,setAvailable] = useState(true)
    const tempPrice = props.priceOfBeer(props.beer.abv)

    const isAvailable = () => {
        String(tempPrice[1]).includes('7') ||
        String(tempPrice[1]).includes('3')
            ? setAvailable(false) : setAvailable(true)
    }

    useEffect(() => {
        isAvailable()
    },[])

    return (
        <div className={s.card}>
            <Link to={`beerDetails/beer-${props.id}`} onClick={() => {
                props.beerDetails(props.id)
                props.setReloadData(false)
            }} className={s.nameBeer}>{props.beer.name}</Link>
            <img src={props.beer.image_url} alt={props.beer.name}/>
            <div>
                <div className={s.priceBeer}>{tempPrice} ₽</div>

                {available ? <button className={s.busket}>в корзину</button> : <div>Нету в наличии</div>}
            </div>
        </div>
    );
};
