import React from 'react';
import {Nav} from "./Nav";
import {Cards} from "./Cards";
import s from './Main.module.css'
export const Main = (props) => {

    return (
        <div className={s.main}>
            <Nav/>
            <h1>Beer :)</h1>
            <Cards priceOfBeer={props.priceOfBeer} fetchBeers={props.fetchBeers} beers={props.beers}/>
        </div>
    );
};
