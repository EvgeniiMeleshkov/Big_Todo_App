import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from './TodoList';
import {v1} from 'uuid';

// CRUD
// create +
// read ++
// update +
// delete +

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todolistID: string]: Array<TaskType>
}

function App() {

    //BLL:
    const todolistID_1 = v1()
    const todoListID_2 = v1()
    const todoListID_3 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'cream', isDone: false},
        ]
    })
    //


    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
        //
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }


    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filter} : el))
    }
    const deleteTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }

    const addTodo = () => {
        const newtodo: TodoListType = {id: todoListID_3, title: 'new title', filter: 'all'};
        setTodoLists([newtodo, ...todoLists]);
        setTasks({...tasks, [todoListID_3]: []})
    }
    //UI:
    const mappedTodoLists = todoLists.map(el => {
        let tasksForRender;
        switch (el.filter) {
            case 'active':
                tasksForRender = tasks[el.id].filter(t => !t.isDone)
                break
            case 'completed':
                tasksForRender = tasks[el.id].filter(t => t.isDone)
                break
            default:
                tasksForRender = tasks[el.id]
        }
        return (
            <TodoList
                key={el.id}
                id={el.id}
                title={el.title}
                tasks={tasksForRender}
                addTask={addTask}
                filter={el.filter}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                deleteTodoList={deleteTodoList}
            />
        )
    })

    return (
        <div className="App">
            <div onClick={addTodo}>new ToDo</div>
            {mappedTodoLists}
        </div>
    );
}

export default App;
