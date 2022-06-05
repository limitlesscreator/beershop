import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router";
import s from "./Card.module.css";

export const Beerdetails = (props) => {
    const location = useLocation()
    const tempId = location.pathname.split('-').reverse()[0]
    const [addToBasket, setAddToBasket] = useState(1)
    const [errorCount, setErrorCount] = useState(false)

    useEffect(() => { // если пользователь вставит ссылку в браузере самостоятельно, то произойдёт запрос на сервер с нужными данными и всё отрисуется:)
        if (props.reloadData) { // если тру, то делаем запрос, а если false, то не будем дважды делать запрос по клику имени бутылки. Если клик был по имени, то значение переходит в false
            props.setReloadData(false)
            let temp = location.pathname.split('-').reverse()[0] // Use PARAMS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111
            props.beerDetails(temp)
            if (props.valueOfStuff.length === 0) { // если данные о наличии пустые, создать заного
                props.fetchBeers()
            }
        }
    }, [])

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
            {props.valueOfStuff[tempId]?.valueOfStuff === 0 ? '' :
                <div>Наличие:{props.valueOfStuff[tempId]?.valueOfStuff}</div>}


            {props.userLogged ? <div>            {props.valueOfStuff[tempId]?.valueOfStuff >= 1 ? <>
                <button
                    onClick={() => {
                        props.setValueOfStuff([...props.valueOfStuff, props.valueOfStuff[location.pathname.split('-').reverse()[0]].valueOfStuff -= addToBasket])
                        props.setSizeBasket((prev) => prev + +addToBasket)
                        props.setConstBasket((prev) => prev + (props.priceOfBeer(props.currentBeer.abv) * addToBasket))
                        setErrorCount(false)
                        setAddToBasket(props.valueOfStuff[location.pathname.split('-').reverse()[0]].valueOfStuff)
                    }}
                    className={s.busket}>Добавить в корзину
                </button>

                <input value={addToBasket} type="number" min={1} max={props.valueOfStuff[tempId]?.valueOfStuff}
                       onChange={(e) => {
                           let temp = e.currentTarget.value
                           if (temp > (props.valueOfStuff[location.pathname.split('-').reverse()[0]].valueOfStuff)){
                               setErrorCount(true)
                               return
                           }
                           else {
                               setErrorCount(false)
                               setAddToBasket(temp)
                           }
                       }}

                /> </> : <div>Нету в наличии</div>}</div> : <div>Чтобы добавить товар в корзину залогинтесь</div>}
            { errorCount ? <div>Не хитри, в наличии
                только {props.valueOfStuff[location.pathname.split('-').reverse()[0]].valueOfStuff} :)</div> : ''}


        </div>
    );
};
