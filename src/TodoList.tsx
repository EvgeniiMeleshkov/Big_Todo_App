import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type TodoListPropType = {
    addTask: (title: string)=>void
    title?: string | number
    tasks: Array<TaskType>
    deleteTasks: (id: string) => void//equal to {id: number, title: string, isDone: boolean}[]
}
export type FilterType = 'All' | 'Completed' | 'Active'

export const TodoList = ({addTask, tasks, deleteTasks, title}: TodoListPropType) => {

    const [titleValue, setTitleValue] = useState('')

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        e.key === 'Enter' && titleValue.match(/\w/) && onButtonClick()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }
    const onButtonClick = () => {
        titleValue.match(/\w/) &&
        addTask(titleValue)
        setTitleValue('')
    }
    const [filter, setFilter] = useState('All')

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    let filteredTasks = tasks

    filter === 'Active'
        ? filteredTasks = tasks.filter(el=>el.isDone === false)
        : filter === 'Completed'
        ? filteredTasks = tasks.filter(el=>el.isDone === true)
        : filteredTasks = tasks

    const onDeleteHandler = (taskID: string) => {
        deleteTasks(taskID)
    }
    const todoBody = filteredTasks.map((t:TaskType, index: number) => {
        return (<li key={index}><input
            key={t.id}
            type={"checkbox"}
            checked={t.isDone}/>
            <span>{t.title}</span>
            <Button callBack={()=>onDeleteHandler(t.id)} name={'X'}/>
        </li>)
    })
    const onFilterHandler = (filter: FilterType) => {
        changeFilter(filter)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Input value={titleValue}  callBackOnChange={onChangeHandler} onKeyUpCallBack={onKeyPressHandler}/>
                <Button callBack={onButtonClick} name={'+'}/>
            </div>
            <ul>
                {todoBody}
            </ul>
            <div>
                <Button callBack={()=>onFilterHandler('All')} name={'All'}/>
                <Button callBack={()=>onFilterHandler('Active')} name={'Active'}/>
                <Button callBack={()=>onFilterHandler('Completed')} name={'Completed'}/>
            </div>
        </div>
    )
}