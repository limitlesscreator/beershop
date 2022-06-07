import React, {useContext} from 'react';
import {Nav} from "./Nav";
import {ListBeers} from "./ListBeers";
import s from './Main.module.css'
import {Beerdetails} from "./Beerdetails";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {Notfoundpage} from "./Notfoundpage";
import {Aboutshop} from "./Aboutshop";
import {Popup} from "./Popup";
import {Context} from "../context";

export const Main = () => {
    const {popup} = useContext(Context)

    return (
        <div className={s.main}>
            {popup ? <Popup /> : ''}
            <Nav/>
            <Routes>
                <Route path={'/'} element={<ListBeers/>}/>

                <Route path={'beerDetails/:beer'} element={<Beerdetails/>}/>

                <Route path={'/about'} element={<Aboutshop/>}/>

                <Route path={'*'} element={<Notfoundpage/>}/>
            </Routes>
        </div>
    );
};
