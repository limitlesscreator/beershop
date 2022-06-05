import React, {useState} from 'react';
import s from '../Components/Popup.module.css'
export const Popup = (props) => {
    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorLogged, setErrorLogged] = useState(false)
    const loggedUser = () => {
        let ifUserReal = false

        for (let i = 0; i < props.beers.length; i++){
            if(String(props.beers[i]['name']) === userLogin && String(props.beers[i]['target_fg']) === userPassword){
                ifUserReal = true
                break
            }
        }
        // name login
        // target_fg  пароль
        console.log(props.beers)
        console.log(userLogin)
        console.log(userPassword)



        if (ifUserReal){
            props.setUserLogged(true)
            props.setPopup(false)
            console.log('user logged')
        }
        else {
            setErrorLogged(true)
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
                <input type="text" placeholder={'login'} onChange={(e) => {
                    setUserLogin(e.currentTarget.value)
                    setErrorLogged(false)
                }} />
                <input type="text" placeholder={'password'} onChange={(e) => {
                    setUserPassword(e.currentTarget.value)
                    setErrorLogged(false)
                }}/>
                <br/>
                {errorLogged ? <div>Неверный пароль или логин</div> : ''}
                <br/>
                <button onClick={loggedUser}>Войти</button>
                <button onClick={() => props.setPopup(false)}>Отмена</button>
            </div>
        </div>
    );
};
