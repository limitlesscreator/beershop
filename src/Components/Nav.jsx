import React from 'react';
import s from './Nav.module.css'
import {Link} from 'react-router-dom'
import {ReactComponent as Basket} from '../icons/basket.svg'

export const Nav = (props) => {
    return (
        <div className={s.nav}>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О магазине</Link>
            beerLogo
            <a href={'#'}>Вход</a>
            <a className={s.basket} href={'#'}>
                <Basket className={s.basketIcon}/>

                <div className={s.sumBasket}>{props.costBasket} ₽.</div>
                <div className={s.countBasket}>{props.sizeBasket}</div>
            </a>
        </div>
    );
};
