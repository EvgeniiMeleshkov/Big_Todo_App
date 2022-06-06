import React from 'react';

type ButtonPropsType = {
    callBack: ()=>void
    name: string
}

const Button = ({name, callBack}: ButtonPropsType) => {
    return (
            <button onClick={callBack}>{name}</button>
    );
};

export default Button;