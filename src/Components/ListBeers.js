import React, {useEffect} from 'react';
import {Beer} from "./Beer";
import s from './ListBeers.module.css'
import {Nav} from "./Nav";
import open from '../Img/open.png'
import coldBeer from '../Img/coldBeer.png'

export const ListBeers = (props) => {

    useEffect(() => {
        if (props.beers.length === 0) {    // у меня делался повторный запрос, когда я с 'О магазине' переходил на главную, если такое решение плохое, дай знать пожалуйста)
            props.fetchBeers('ListBeers')
        }
    }, [])

    return (
        <div className={s.cards}>
            <img className={s.open} src={open} alt="openSign"/>
            <img className={s.coldBeer} src={coldBeer} alt="coldBeer"/>

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
