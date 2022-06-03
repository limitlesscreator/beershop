import React from 'react';
import s from './Nav.module.css'
export const Nav = () => {
    return (
        <div className={s.nav}>
            <a href={'#'}>Главная</a>
            <a href={'#'}>О магазине</a>
            <a href={'#'}>Вход</a>
            <a href={'#'}>137 591 р.</a>
        </div>
    );
};
