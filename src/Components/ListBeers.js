import React, {useEffect} from 'react';
import {Beer} from "./Beer";
import s from './Cards.module.css'
import {Nav} from "./Nav";

export const ListBeers = (props) => {
    useEffect(() => {
        console.log('bam')
        props.fetchBeers('ListBeers')
    }, [])

    return (
        <div className={s.cards}>
            {props.beers.map((el, index) => {
                return (
                    <Beer
                        userLogged={props.userLogged}
                        setConstBasket={props.setConstBasket}
                        setSizeBasket={props.setSizeBasket}
                        setValueOfStuff={props.setValueOfStuff}
                        valueOfStuff={props.valueOfStuff[el.id]?.valueOfStuff}
                        allValueOfStuffs={props.valueOfStuff}
                        reloadData={props.reloadData}
                        setReloadData={props.setReloadData}
                        id={el.id}
                        beerDetails={props.beerDetails}
                        priceOfBeer={props.priceOfBeer}
                        key={el.id}
                        beer={el}/>
                )
            })}
        </div>
    );
};
