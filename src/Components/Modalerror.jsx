import React from 'react';
import s from './Modalerror.module.css'
export const Modalerror = (props) => {
    return (
        <div className={s.modal}>
            <div onClick={() => {
                props.setLongFetchingError(false)
                props.setFetchingBeersError(false)
            }}>Закрыть</div>
            {props.text}
        </div>
    );
};
