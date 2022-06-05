import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import {Main} from "./Components/Main";

function App() {
    const [beers, setBeers] = useState([])
    const [currentBeer, setCurrentBeer] = useState({})
    const [reloadData, setReloadData] = useState(true)
    const [sizeBasket, setSizeBasket] = useState(0)
    const [costBasket, setConstBasket] = useState(0)
    const [popup,setPopup] = useState(false)
    const [userLogged, setUserLogged] = useState(false)

    const [valueOfStuff, setValueOfStuff] = useState([])


    const [bestBeer, setBestBeer] = useState('Godzila')



    const fetchBeers = () => {
        fetch('https://api.punkapi.com/v2/beers?page=1&per_page=12')
            .then(res => res.json())
            .then(data => {
                ////////////////////////////////////////////////////////
                if (valueOfStuff.length === 0){
                    let tempOfId = [] // создаётся массив с кол-вом наличия товара
                    data.forEach(el => tempOfId.push({id: el.id, valueOfStuff: +el.name.length % 6 === 0 ? 0 : Number(el.name.length) * 2}))
                    setValueOfStuff(tempOfId)
                }
                ///////////////////////////////////////////////////////
                setBeers(data)
            })
    }

    const beerDetails = (id) => {
        fetch(`https://api.punkapi.com/v2/beers/${id}`)
            .then(res => res.json())
            .then(data => {
                setCurrentBeer(data[0])
                console.log(data[0])
            })
    }

    const priceOfBeer = (value) => {
        let temp = String(Math.floor((value / 3) * 100)).slice(0, 2)
        return temp.padEnd(temp.length + 1, '9')
    }

    return (
        <>
            <Main
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
