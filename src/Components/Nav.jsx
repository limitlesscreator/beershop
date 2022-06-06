import React from 'react';
import s from './Nav.module.css'
import {Link} from 'react-router-dom'
import {ReactComponent as Basket} from '../icons/basket.svg'
import logo from '../Img/logoBeer.png'

export const Nav = (props) => {
    const specialClass = s.basket + ' ' + s.hoverElement
    return (
        <div className={s.nav}>
            <div className={s.helperMenu}></div>
            <div className={s.pairFixedSize}>
                <Link className={s.fixedSize} to={'/'}>Главная</Link>
                <Link className={s.fixedSize} to={'/about'}>О магазине</Link>
            </div>
            <div className={s.positionLogo}>
                <img className={s.logo} src={logo} alt=""/>
            </div>
            {props.userLogged ?<a onClick={() => props.setUserLogged(false)} href={'#'}>Выход</a> : <a onClick={() => props.setPopup(true)} href={'#'}>Вход</a> }


            <span className={specialClass}>
                {props.userLogged ?   <a className={s.basket} href={'#'}>
                <span className={s.spanHelper}>
                        <Basket className={s.basketIcon}/>
                <div className={s.countBasket}>{props.sizeBasket}</div>
                </span>
                    <div className={s.sumBasket}>{props.costBasket} ₽.</div>
                </a> : ''}
            </span>

        </div>
    );
};
