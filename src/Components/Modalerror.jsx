import React from 'react';
import s from './Modalerror.module.css'
export const Modalerror = (props) => {

    const clickHandler = () => {
        props.setLongFetchingError(false)
        props.setFetchingBeersError(false)
    }

    return (
        <div className={s.modal}>
            <div onClick={clickHandler}>Закрыть</div>
            {props.text}
        </div>
    );
};
