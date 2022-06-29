import React, {ChangeEvent, useState} from 'react';
type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [val,setVal] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        addTitle()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setVal(e.currentTarget.value)
    }
    const addTitle = () => {
        val !== '' &&
        props.callBack(val.trim());
    }
    return (
        edit
            ? <input autoFocus
                     onBlur={onDoubleClickHandler}
                     value={val}
                     onChange={onChangeHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    );
};