import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todlist.module.css'
import {CheckBox} from './CheckBox';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeBoxChecked: (value: boolean, tID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if(title.trim() === '') {
            setError('Title is required')
        }
        title.match(/\w/) &&
        props.addTask(title.trim());
        setTitle("");

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onCheckedToggle = (value: boolean, tID: string) => {
        props.changeBoxChecked(value, tID)
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const onClickHandler = (tID: string) => props.removeTask(tID)
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? styles.error : ''}
                value={title}
                   onChange={ onChangeHandler }
                   onKeyUp={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <li className={t.isDone ? styles.isDone : ''} key={t.id}>
                        <CheckBox checked={t.isDone} callBack={(value)=>onCheckedToggle(value, t.id)}/>
                        <span>{t.title}</span>
                        <button onClick={ ()=>onClickHandler(t.id) }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? styles.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? styles.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? styles.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
