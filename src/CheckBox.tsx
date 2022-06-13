import React, {ChangeEvent} from 'react';
type CheckBoxPropsType = {
    checked: boolean
    callBack: (value: boolean)=>void
}
export const CheckBox = (props: CheckBoxPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input onChange={onChangeHandler} type="checkbox" checked={props.checked}/>
    );
};