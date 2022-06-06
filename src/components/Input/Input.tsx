import React from 'react';

type InputPropsType = {
    type?: string
    checked?: boolean
    callBackOnChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void
    value?: string
    onKeyUpCallBack?: (e: React.KeyboardEvent<HTMLInputElement>)=>void
}

const Input = ({callBackOnChange, value, onKeyUpCallBack, type, checked}: InputPropsType) => {
    return (
        <input type={type} checked={checked} onChange={callBackOnChange} value={value} onKeyUp={onKeyUpCallBack}/>
    );
};

export default Input;