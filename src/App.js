import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import {Main} from "./Components/Main";

function App() {
    const [beers,setBeers] = useState([])
    const [bestBeer, setBestBeer] = useState('Godzila')

    const fetchBeers = () => {
        fetch('https://api.punkapi.com/v2/beers?page=1&per_page=8')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBeers(data)
            })
    }

    const priceOfBeer = (value) => {
        let temp = String(Math.floor((value / 3) * 100)).slice(0,2)
        return temp.padEnd(temp.length + 1,'9')
    }

  return (
    <>
        {/*<button onClick={() => fetchBeers()}>fetch</button>*/}
      <Main priceOfBeer={priceOfBeer} beers={beers} fetchBeers={fetchBeers}/>
    </>
  );
}

export default App;
