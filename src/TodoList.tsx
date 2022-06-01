import React, {useState} from 'react';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
type TodoListPropType = {
    title?: string | number
    tasks: Array<TaskType>
    deleteTasks: (id: number) => void//equal to {id: number, title: string, isDone: boolean}[]
}
export type FilterType = 'All' | 'Completed' | 'Active'

export const TodoList = (props: TodoListPropType) => {

    const [filter, setFilter] = useState('All')
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    let filteredTasks = props.tasks

    filter === 'Active'
        ? filteredTasks = props.tasks.filter(el=>el.isDone === false)
        : filter === 'Completed'
        ? filteredTasks = props.tasks.filter(el=>el.isDone === true)
        : filteredTasks = props.tasks


    const todoBody = filteredTasks.map((t:TaskType, index: number) =>
        <li key={index}><input
            key={t.id}
            type={"checkbox"}
            checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={()=>{props.deleteTasks(t.id)}}>X</button>
        </li>)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {todoBody}
            </ul>
            <div>
                <button onClick={()=> {changeFilter('All')}}>All</button>
                <button onClick={()=> {changeFilter('Active')}}>Active</button>
                <button onClick={()=> {changeFilter('Completed')}}>Completed</button>
            </div>
        </div>
    )
}