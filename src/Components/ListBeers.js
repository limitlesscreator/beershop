import React, {useContext, useEffect} from 'react';
import {Beer} from "./Beer";
import s from './ListBeers.module.css'
import open from '../Img/open.png'
import coldBeer from '../Img/coldBeer.png'
import {Context} from "../context";

export const ListBeers = () => {
    const {
        valueOfStuff,
        fetchBeers,
        beers,
    } = useContext(Context)


    useEffect(() => {
        if (beers.length === 0) {    // у меня делался повторный запрос, когда я с 'О магазине' переходил на главную, если такое решение плохое, дай знать пожалуйста)
            fetchBeers('ListBeers')
        }
    }, [])

    return (
        <div className={s.cards}>
            <img className={s.open} src={open} alt="openSign"/>
            <img className={s.coldBeer} src={coldBeer} alt="coldBeer"/>

            {beers.map(el => {
                return (
                    <Beer
                        valueOfStuff={valueOfStuff[el.id]?.valueOfStuff}
                        id={el.id}
                        key={el.id}
                        beer={el}
                    />
                )
            })}
        </div>
    );
};
