import React from 'react';
import "./input.scss"

const Input = ({...attr}) => {
    return (
        <div>
            <input type="text" {...attr}/>
        </div>
    );
};

export default Input;