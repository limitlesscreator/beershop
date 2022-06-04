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
                    <Beer reloadData={props.reloadData} setReloadData={props.setReloadData} id={el.id} beerDetails={props.beerDetails} priceOfBeer={props.priceOfBeer} key={props.beers.id} beer={props.beers[index]}/>
                )
            })}
        </div>
    );
};
