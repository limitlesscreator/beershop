import React from 'react';
import s from '../Components/Popup.module.css'
export const Popup = (props) => {
    const loggedUser = () => {
        if (true){
            props.setUserLogged(true)
            console.log('user logged')
        }
        else {
            console.log('error')
        }
    }
    return (
        <div className={s.main}>
            <div className={s.square}>
                <div onClick={() => props.setPopup(false)}>Закрыть</div>

                <br/>
                <br/>
                <br/>
                <br/>
                <input type="text" placeholder={'login'}/>
                <input type="text" placeholder={'password'}/>
                <br/>
                <button onClick={loggedUser}>Войти</button>
                <button onClick={() => props.setPopup(false)}>Отмена</button>
            </div>
        </div>
    );
};
