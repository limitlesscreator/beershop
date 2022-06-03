import React, {useEffect} from 'react';
import {Card} from "./Card";
import s from './Cards.module.css'

export const Cards = (props) => {
    useEffect(() => {
        props.fetchBeers()
    },[])

    return (
        <div className={s.cards}>
            {props.beers.map((el,index) => {
                return (
                    <Card priceOfBeer={props.priceOfBeer} key={props.beers.id} beers={props.beers[index]}/>
                )
            })}
        </div>
    );
};
