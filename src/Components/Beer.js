import React, {useContext} from 'react';
import s from './Beer.module.css'
import {Link} from 'react-router-dom'
import {Context} from "../context";

export const Beer = (props) => {
    const {
        userLogged,
        setConstBasket,
        setSizeBasket,
        setValueOfStuff,
        valueOfStuff,
        setReloadData,
        beerDetails,
        priceOfBeer,
    } = useContext(Context)

    const tempPrice = priceOfBeer(props.beer.abv)

    const addToBasketOne = () => {
        setValueOfStuff([...valueOfStuff, valueOfStuff[props.id].valueOfStuff -= 1])
        setSizeBasket((prev) => prev + 1)
        setConstBasket((prev) => prev + +tempPrice)
    }

    return (
        <div className={s.card}>
            <Link to={`beerDetails/beer-${props.id}`} onClick={() => {
                beerDetails(props.id)
                setReloadData(false)
            }} className={s.nameBeer}>{props.beer.name}</Link>

            <img src={props.beer.image_url} alt={props.beer.name}/>

            <div>
                <div className={s.priceBeer}>{tempPrice} ₽</div>
                {userLogged ?
                    <div>{props.valueOfStuff >= 1 ?
                        <button onClick={addToBasketOne} className={s.busket}>в корзину</button> :
                        <div>Нету в наличии</div>}</div> :
                    <div className={s.shouldLoggin}>Чтобы добавить товар в корзину залогинтесь</div>}
            </div>
        </div>
    );
};
