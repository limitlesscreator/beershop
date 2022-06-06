import React from 'react';
import s from './Modalerror.module.css'
import {ReactComponent as Closeicon} from "../icons/close.svg";
export const Modalerror = (props) => {

    const clickHandler = () => {
        props.setLongFetchingError(false)
        props.setFetchingBeersError(false)
    }

    return (
        <div className={s.modal}>
            <Closeicon onClick={clickHandler} className={s.closeIcon}/>
            {props.text}
        </div>
    );
};
