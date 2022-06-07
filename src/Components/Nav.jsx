import React, {useContext} from 'react';
import s from './Nav.module.css'
import {Link} from 'react-router-dom'
import {ReactComponent as Basket} from '../icons/basket.svg'
import logo from '../Img/logoBeer.png'
import {Context} from "../context";

export const Nav = () => {
    const {setUserLogged,userLogged,setPopup,costBasket,sizeBasket} = useContext(Context)

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
            {userLogged ?<a onClick={() => setUserLogged(false)} href={'#'}>Выход</a> : <a onClick={() => setPopup(true)} href={'#'}>Вход</a> }


            <span className={specialClass}>
                {userLogged ?   <a className={s.basket} href={'#'}>
                <span className={s.spanHelper}>
                        <Basket className={s.basketIcon}/>
                <div className={s.countBasket}>{sizeBasket}</div>
                </span>
                    <div className={s.sumBasket}>{costBasket} ₽.</div>
                </a> : ''}
            </span>

        </div>
    );
};
