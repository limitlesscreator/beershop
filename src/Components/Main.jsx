import React from 'react';
import {Nav} from "./Nav";
import {ListBeers} from "./ListBeers";
import s from './Main.module.css'
import {Beerdetails} from "./Beerdetails";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import App from "../App";
import {Notfoundpage} from "./Notfoundpage";
import {Aboutshop} from "./Aboutshop";
export const Main = (props) => {
    //current location
    // const location = useLocation()
    // console.log(location.pathname)

    return (
        <div className={s.main}>
            <Nav costBasket={props.costBasket} sizeBasket={props.sizeBasket}/>
            <Routes>
                <Route path={'/'} element={<ListBeers setConstBasket={props.setConstBasket} setSizeBasket={props.setSizeBasket} setValueOfStuff={props.setValueOfStuff} valueOfStuff={props.valueOfStuff} setReloadData={props.setReloadData}  beerDetails={props.beerDetails} priceOfBeer={props.priceOfBeer} fetchBeers={props.fetchBeers} beers={props.beers}/>}/>
                <Route path={'beerDetails/:beer'} element={<Beerdetails setConstBasket={props.setConstBasket} setSizeBasket={props.setSizeBasket}   setValueOfStuff={props.setValueOfStuff} valueOfStuff={props.valueOfStuff} setReloadData={props.setReloadData} priceOfBeer={props.priceOfBeer} reloadData={props.reloadData} beerDetails={props.beerDetails} currentBeer={props.currentBeer}/>}/>
                <Route path={'/about'} element={<Aboutshop/>}/>
                <Route path={'*'} element={<Notfoundpage/>}/>
            </Routes>
        </div>
    );
};
