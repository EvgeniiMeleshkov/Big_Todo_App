import React from "react";
export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
type TodoListPropType = {
    title: string,
    tasks: Array<TaskType>   //equal to {id: number, title: string, isDone: boolean}[]
}

export function TodoList(props: TodoListPropType) {

    const todoBody = props.tasks.map((t) =>
        <li key={t.id}><input key={t.id} type={"checkbox"} checked={t.isDone}/> <span>{t.title}</span></li>)
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}