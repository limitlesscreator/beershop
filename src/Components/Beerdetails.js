import React, {useContext, useEffect, useRef} from 'react';
import {useLocation} from "react-router";
import s from "./Beerdetails.module.css";
import price from '../Img/priceForBeer.png'
import {Context} from "../context";

export const Beerdetails = () => {
    const {
        userLogged,
        fetchBeers,
        setConstBasket,
        setSizeBasket,
        setValueOfStuff,
        valueOfStuff,
        setReloadData,
        priceOfBeer,
        reloadData,
        beerDetails,
        currentBeer,
        addToBasket,
        errorCount,
        heightPicture,
        setAddToBasket,
        setErrorCount,
        setHeightPicture,
    } = useContext(Context)

    const location = useLocation()
    const tempId = location.pathname.split('-').reverse()[0]
    const valueOfStuffShort = valueOfStuff[tempId]?.valueOfStuff


    // тут я делаю тень для бутылки пива) , есть маленькие картинки с символами под ними и им тень не получается сделать, поэтому я проверяю высоту картинки и затем только добавляю тень,
    // я понимаю что решение не гуд,что спустя 400ms я это делаю, я забыл как правильно делать, напомни если сможешь:) мол как проверить высоту картинки после того, как она отобразится
    let imgRef = useRef()
    setTimeout(() => {
        setHeightPicture(imgRef.current?.height)
    },400)

    const onChangeHandler = (e) => {
        let temp = e.currentTarget.value
        if (temp > (valueOfStuff[tempId].valueOfStuff)) {
            setErrorCount(true)
            return
        } else {
            setErrorCount(false)
            setAddToBasket(temp)
        }
    }

    const onClickHandler = () => {
        setValueOfStuff([...valueOfStuff, valueOfStuff[tempId].valueOfStuff -= addToBasket])
        setSizeBasket((prev) => prev + +addToBasket)
        setConstBasket((prev) => prev + (priceOfBeer(currentBeer.abv) * addToBasket))
        setErrorCount(false)

        if (valueOfStuffShort - addToBasket < addToBasket){ // решает задачу того, что нельзя добавить (14) товара в корзину, если осталось меньше
            setAddToBasket(valueOfStuff[tempId].valueOfStuff) // тут не вставляется локальная переменная valueOfStuff уже получится бага почему-то))
        }
    }

    useEffect(() => { // если пользователь вставит ссылку в браузере самостоятельно, то произойдёт запрос на сервер с нужными данными (на одну позицию товара) и всё отрисуется:)
        if (reloadData) { // если тру, то делаем запрос, а если false, то не будем дважды делать запрос по клику имени бутылки. Если клик был по имени, то значение переходит в false
            setReloadData(false)
            beerDetails(tempId)
            if (valueOfStuff.length === 0) { // если данные о наличии пустые, создать заного
                fetchBeers('BeerDetails')
            }
        }
    }, [])


    return (
        <div className={s.main}>
            <div className={s.firstPart}>
                {heightPicture > 350 ?
                <img className={s.currentBeerSecond} src={currentBeer.image_url} alt=""/> : ''}
                <img className={heightPicture > 350 || heightPicture === 0 ? s.currentBeer  :   s.littleBeer  } src={currentBeer.image_url} ref={imgRef} alt=""/>
            </div>

            <div className={heightPicture > 350 || heightPicture === 0 ? s.secondPartBigBeer : s.secondPartLittleBeer}>
                <img className={s.priceBeerPic} src={price} alt=""/>

                <div className={s.beerName}>{currentBeer?.name?.split(' ').slice(0,2).join(' ')}</div>

                <div className={s.priceBeer}>
                   {priceOfBeer(currentBeer.abv)} ₽
                </div>

                <div className={s.description}>
                    {currentBeer.description}
                </div>

                {valueOfStuffShort === 0 ? '' : <div className={s.valueStuff}>Наличие: <span className={s.countValueStuff}>{valueOfStuffShort}</span></div>}

                {userLogged ?
                    <div>{valueOfStuffShort >= 1 ?
                     <div className={s.busketCounter}>
                         {errorCount ? <div className={s.dontCheating}>Не хитри, в наличии только {valueOfStuff[tempId].valueOfStuff} :)</div> : ''}
                         <button  onClick={onClickHandler} className={s.busket}>Добавить в корзину</button>
                        <input className={s.input} value={addToBasket} type="number" min={1} max={valueOfStuffShort} onChange={onChangeHandler}/>
                     </div> :
                        <div className={s.emptyStuff}>Нету в наличии</div>}
                    </div> : <div>Чтобы добавить товар в корзину залогинтесь</div>}
            </div>
        </div>
    );
};
