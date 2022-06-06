import React, {useEffect, useState} from 'react';
import s from './Beer.module.css'
import {Link, useLocation} from 'react-router-dom'
import {Nav} from "./Nav";

export const Beer = (props) => {
    const [available, setAvailable] = useState(true)
    const tempPrice = props.priceOfBeer(props.beer.abv)
    const addToBasketOne = () => {
        props.setValueOfStuff([...props.allValueOfStuffs, props.allValueOfStuffs[props.id].valueOfStuff -= 1])
        props.setSizeBasket((prev) => prev + 1)
        props.setConstBasket((prev) => prev + +tempPrice)
    }
    return (
        <div className={s.card}>
            <Link to={`beerDetails/beer-${props.id}`} onClick={() => {
                props.beerDetails(props.id)
                props.setReloadData(false)
            }} className={s.nameBeer}>{props.beer.name}</Link>
            <img src={props.beer.image_url} alt={props.beer.name}/>
            <div>
                <div className={s.priceBeer}>{tempPrice} ₽</div>
                {props.userLogged ? <div>{props.valueOfStuff >= 1 ?
                    <button onClick={addToBasketOne} className={s.busket}>в корзину</button> :
                    <div>Нету в наличии</div>}</div> :
                    <div className={s.shouldLoggin}>Чтобы добавить товар в корзину залогинтесь</div>}
            </div>
        </div>
    );
};
