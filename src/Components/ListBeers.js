import React, {useEffect} from 'react';
import {Beer} from "./Beer";
import s from './Cards.module.css'

export const ListBeers = (props) => {
    useEffect(() => {
        props.fetchBeers()
    },[])

    return (
        <div className={s.cards}>
            {props.beers.map((el,index) => {
                return (
                    <Beer setConstBasket={props.setConstBasket} setSizeBasket={props.setSizeBasket} setValueOfStuff={props.setValueOfStuff} valueOfStuff={props.valueOfStuff[el.id]?.valueOfStuff} allValueOfStuffs={props.valueOfStuff} reloadData={props.reloadData} setReloadData={props.setReloadData} id={el.id} beerDetails={props.beerDetails} priceOfBeer={props.priceOfBeer} key={el.id} beer={el}/>
                )
            })}
        </div>
    );
};
