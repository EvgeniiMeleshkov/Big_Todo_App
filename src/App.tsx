import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [id: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cheeze', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Cola', isDone: false},
            {id: v1(), title: 'Snaks', isDone: false},
        ]
    });


    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    const addTodoList = (title: string) => {
        const todoListID = v1()
        setTodolists([{id: todoListID, title: title, filter: 'all'}, ...todolists])
        setTasks({[todoListID]: [], ...tasks})
    }
    const deleteTodo = (todoListID: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }
    const updateTaskTitle = (todoListID: string, newTitle: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => taskID === el.id ? {...el, title: newTitle} : el)})
    }
    const updateTodoTitle = (todoListID: string, newTitle: string) => {
        setTodolists(todolists.map(el=> el.id === todoListID ? {...el, title: newTitle} : el))
    }
    const mappedTodos = todolists.map(el => {

        let tasksForTodolist = tasks[el.id];

        if (el.filter === 'active') {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
        }
        if (el.filter === 'completed') {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
        }

        return (
            <div className="todos">
                <Todolist
                    todolistID={el.id}
                    key={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={el.filter}
                    deleteTodo={deleteTodo}
                    updateTitle={updateTaskTitle}
                    updateTodoTitle={updateTodoTitle}
                />
            </div>
        )
    })
    return (
        <div className="App">
            <div className="addTodo">
                <AddItemForm addItem={addTodoList}/>
            </div>
            <div className='todos'>
                {mappedTodos}
            </div>

        </div>
    );
}

export default App;
