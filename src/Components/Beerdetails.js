import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import s from "./Card.module.css";

export const Beerdetails = (props) => {
    const location = useLocation()

    useEffect(() => { // если пользователь вставит ссылку в браузере самостоятельно, то произойдёт запрос на сервер с нужными данными и всё отрисуется:)
        if (props.reloadData) { // если тру, то делаем запрос, а если false, то не будем дважды делать запрос по клику имени бутылки. Если клик был по имени, то значение переходит в false
            props.setReloadData(false)
            let temp = location.pathname.split('-').reverse()[0] // Use PARAMS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111
            props.beerDetails(temp)
        }
    }, [])
    console.log(props.priceOfBeer(props.currentBeer.abv))

    return (
        <div>
            {props.currentBeer.name}
            <br/>
            <img width={'150px'} src={props.currentBeer.image_url} alt=""/>
            <br/>
            price:{props.priceOfBeer(props.currentBeer.abv)} ₽
            <br/>
            {props.currentBeer.description}
            <br/>
            {console.log(props.valueOfStuff)}
            Наличие:{props.valueOfStuff[location.pathname.split('-').reverse()[0]].valueOfStuff}
            <br/>
            <button
                onClick={() => props.setValueOfStuff([...props.valueOfStuff, props.valueOfStuff[location.pathname.split('-').reverse()[0]].valueOfStuff -= 1])}>Добавить
                в карзину
            </button>
            {/*{available ? <button className={s.busket}>в корзину</button> : <div>Нету в наличии</div>}*/}

        </div>
    );
};
