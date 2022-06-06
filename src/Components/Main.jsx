import React from 'react';
import {Nav} from "./Nav";
import {ListBeers} from "./ListBeers";
import s from './Main.module.css'
import {Beerdetails} from "./Beerdetails";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import App from "../App";
import {Notfoundpage} from "./Notfoundpage";
import {Aboutshop} from "./Aboutshop";
import {Popup} from "./Popup";

export const Main = (props) => {
    return (
        <div className={s.main}>
            {props.popup ?
                <Popup
                    beers={props.beers}
                    setUserLogged={props.setUserLogged}
                    setPopup={props.setPopup}/> : ''}
            <Nav
                setUserLogged={props.setUserLogged}
                userLogged={props.userLogged}
                setPopup={props.setPopup}
                costBasket={props.costBasket}
                sizeBasket={props.sizeBasket}/>
            <Routes>
                <Route path={'/'}
                       element={<ListBeers
                           userLogged={props.userLogged}
                           setConstBasket={props.setConstBasket}
                           setSizeBasket={props.setSizeBasket}
                           setValueOfStuff={props.setValueOfStuff}
                           valueOfStuff={props.valueOfStuff}
                           setReloadData={props.setReloadData}
                           beerDetails={props.beerDetails}
                           priceOfBeer={props.priceOfBeer}
                           fetchBeers={props.fetchBeers}
                           beers={props.beers}/>}/>

                <Route path={'beerDetails/:beer'}
                       element={<Beerdetails
                           setLongFetchingError={props.setLongFetchingError}
                           longFetchingError={props.longFetchingError}
                           userLogged={props.userLogged}
                           fetchBeers={props.fetchBeers}
                           setConstBasket={props.setConstBasket}
                           setSizeBasket={props.setSizeBasket}
                           setValueOfStuff={props.setValueOfStuff}
                           valueOfStuff={props.valueOfStuff}
                           setReloadData={props.setReloadData}
                           priceOfBeer={props.priceOfBeer}
                           reloadData={props.reloadData}
                           beerDetails={props.beerDetails}
                           currentBeer={props.currentBeer}/>}/>

                <Route path={'/about'} element={<Aboutshop/>}/>

                <Route path={'*'} element={<Notfoundpage/>}/>
            </Routes>
        </div>
    );
};
