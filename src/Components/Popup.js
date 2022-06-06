import React, {useState} from 'react';
import s from '../Components/Popup.module.css'
import {ReactComponent as Closeicon} from "../icons/close.svg";

export const Popup = (props) => {
    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorLogged, setErrorLogged] = useState(false)
    const loggedUser = () => {
        let ifUserReal = false

        for (let i = 0; i < props.beers.length; i++) {
            if (String(props.beers[i]['name']) === userLogin && String(props.beers[i]['target_fg']) === userPassword) {
                ifUserReal = true
                break
            }
        }
        // name: login
        // target_fg:  пароль
        if (ifUserReal) {
            props.setUserLogged(true)
            props.setPopup(false)
            console.log('user logged')
        } else {
            setErrorLogged(true)
            console.log('error')
        }
    }

    const handleKeypress = e => { // Нажатие Enter === Нажать на кнопку
        if (e.code  === 'Enter') {
            loggedUser();
        }
    };

    return (
        <div className={s.main}>
            <div className={s.square}>
                <Closeicon onClick={() => props.setPopup(false)} className={s.closeIcon}/>

                <div className={s.inputContainer}>
                    <input type="text" placeholder={'login'} onKeyPress={handleKeypress} onChange={(e) => {
                        setUserLogin(e.currentTarget.value)
                        setErrorLogged(false)
                    }}/>
                    <input type="text" placeholder={'password'} onKeyPress={handleKeypress} onChange={(e) => {
                        setUserPassword(e.currentTarget.value)
                        setErrorLogged(false)
                    }}/>
                </div>

                <div className={s.buttonContainer}>
                    <button onClick={loggedUser}>Войти</button>
                    <button onClick={() => props.setPopup(false)}>Отмена</button>
                </div>

                {errorLogged ? <div className={s.wrongPasswork}>Неверный пароль или логин</div> : ''}

            </div>
        </div>
    );
};
