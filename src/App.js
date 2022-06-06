import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import {Main} from "./Components/Main";
import {Modalerror} from "./Components/Modalerror";

function App() {
    const [beers, setBeers] = useState([])
    const [currentBeer, setCurrentBeer] = useState({})
    const [reloadData, setReloadData] = useState(true)
    const [sizeBasket, setSizeBasket] = useState(0)
    const [costBasket, setConstBasket] = useState(0)
    const [popup, setPopup] = useState(false)
    const [userLogged, setUserLogged] = useState(true)
    const [longFetchingError, setLongFetchingError] = useState(false)
    const [fetchingBeersError, setFetchingBeersError] = useState(false)
    const [valueOfStuff, setValueOfStuff] = useState([])


    // const [bestBeer, setBestBeer] = useState('Godzila') в будущем хочу добавить popup или что-то вроде такого,  'пиво дня'))0


    // Запрос на 12 объевтов
    const fetchBeers = (placeFetching) => {
        const error = Math.round(Math.random() * (3 - 1) + 1) === 3 // шансы 1 к 3, что нам придёт ошибка с сервера) запрос на не существующий Url
        let temp = placeFetching === 'ListBeers' ?
            fetch(`https://api.punka${error ? 'error' : ''}pi.com/v2/beers?page=1&per_page=12`) :  // ошибка запроса сделал только на главном экране
            fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=12`)

        if (error) {
            setLongFetchingError(true)
            setFetchingBeersError(true)
        }

        temp.then(res => res.json())
            .then(data => {
                if (valueOfStuff.length === 0) {
                    let tempOfId = [] // создаётся массив с кол-вом наличия товара
                    data.forEach(el => tempOfId.push({
                        id: el.id,
                        valueOfStuff: +el.name.length % 6 === 0 ? 0 : Number(el.name.length) * 2
                    }))
                    setValueOfStuff(tempOfId)
                }
                setBeers(data)
            })
    }

    // Promise который rejectИца спустя время
    const promiseFail = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Slow Internet Connection')
        }, 2000)
    })

    // Запрос на конкретное пиво, допустим в БД, лежало бы больше информации на конкретную позицию товара)
    // Так же если пользователь даст ссылку другу на конкретный товар и тот перейдёт, то будет запрос только на 1 товар.
    // Если я где-то не прав, дай знать пожалуйста) буду благодарен
    const fetchBeerDetail = (id) => new Promise((resolve, reject) => {
        fetch(`https://api.punkapi.com/v2/beers/${id}`)
            .then(res => res.json())
            .then(data => {
                resolve('all nice')
                setCurrentBeer(data[0])
            })
    })

    // если запрос успешно выполнился до 2сек, то всё гуд, иначе показывааем warning о медленном интернете!
    const beerDetails = (id) => {
        Promise.race([promiseFail(), fetchBeerDetail(id)])
            .then(res => {
                console.log('Данные о конкретном пиве загрузились до 2-ух секунд')
            })
            .catch(e => {
                console.warn(new Error(`У вас медленный интернет, подождите пожалуйста...:) ${e}`))
                setLongFetchingError(true)
            })
    }

    // Создания цен для пива
    const priceOfBeer = (value) => {
        let temp = String(Math.floor((value / 3) * 100)).slice(0, 2)
        return temp.padEnd(temp.length + 1, '9')
    }

    //Закрытие модального окна с ошибкой спустя 15 сек
    useEffect(() => {
        setTimeout(() => {
            setLongFetchingError(false)
            setFetchingBeersError(false)
        }, 15000)
    }, [longFetchingError, fetchingBeersError])

    return (
        <>
            {longFetchingError || fetchingBeersError ? <Modalerror
                setLongFetchingError={setLongFetchingError}
                setFetchingBeersError={setFetchingBeersError}
                text={`${longFetchingError && !fetchingBeersError ? 'Медленный интернет :(' : 'Данные не пришли'} `}/> : ''}
            <Main
                setLongFetchingError={setLongFetchingError}
                longFetchingError={longFetchingError}
                userLogged={userLogged}
                setUserLogged={setUserLogged}
                setPopup={setPopup}
                popup={popup}
                setConstBasket={setConstBasket}
                setSizeBasket={setSizeBasket}
                reloadData={reloadData}
                setReloadData={setReloadData}
                currentBeer={currentBeer}
                beerDetails={beerDetails}
                priceOfBeer={priceOfBeer}
                beers={beers}
                fetchBeers={fetchBeers}
                sizeBasket={sizeBasket}
                costBasket={costBasket}
                valueOfStuff={valueOfStuff}
                setValueOfStuff={setValueOfStuff}
            />
        </>
    );
}

export default App;
