import './App.css';
import React, {useEffect, useState} from "react";
import {Main} from "./Components/Main";
import {Modalerror} from "./Components/Modalerror";
import {Context} from './context'

function App() {
    const [beers, setBeers] = useState([])
    const [currentBeer, setCurrentBeer] = useState({})
    const [reloadData, setReloadData] = useState(true)
    const [sizeBasket, setSizeBasket] = useState(0)
    const [costBasket, setConstBasket] = useState(0)
    const [popup, setPopup] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [longFetchingError, setLongFetchingError] = useState(false)
    const [fetchingBeersError, setFetchingBeersError] = useState(false)
    const [valueOfStuff, setValueOfStuff] = useState([])
    const [addToBasket, setAddToBasket] = useState(1)
    const [errorCount, setErrorCount] = useState(false)
    const [heightPicture, setHeightPicture] = useState(0)
    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorLogged, setErrorLogged] = useState(false)

    // Запрос на 12 объевтов
    const fetchBeers = (placeFetching) => {
        let error
        if (placeFetching === 'ListBeers') {
            error = Math.round(Math.random() * (3 - 1) + 1) === 3// шансы 1 к 3, что нам придёт ошибка с сервера) запрос на не существующий Url
        } else {
            error = false
        }

        let temp = placeFetching === 'ListBeers' ?
            fetch(`https://api.punka${error ? 'error' : ''}pi.com/v2/beers?page=1&per_page=12`) : fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=12`)

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
        // Babylon tower :D
        <Context.Provider value={{
            beers,
            popup,
            setPopup,
            userLogin,
            reloadData,
            sizeBasket,
            costBasket,
            errorCount,
            userLogged,
            fetchBeers,
            beerDetails,
            currentBeer,
            priceOfBeer,
            addToBasket,
            errorLogged,
            setUserLogin,
            userPassword,
            valueOfStuff,
            setReloadData,
            setUserLogged,
            setErrorCount,
            heightPicture,
            setSizeBasket,
            setAddToBasket,
            setErrorLogged,
            setConstBasket,
            setUserPassword,
            setValueOfStuff,
            setHeightPicture,
            longFetchingError,
            setLongFetchingError,
            setFetchingBeersError,
        }}>
            <>
                {longFetchingError || fetchingBeersError ?
                    <Modalerror
                        text={`${longFetchingError && !fetchingBeersError ? 'Медленный интернет :(' : 'Данные не пришли :('} `}/> : ''}
                <Main

                />
            </>
        </Context.Provider>
    );
}

export default App;
