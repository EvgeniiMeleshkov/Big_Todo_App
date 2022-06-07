import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "Type Script", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const deleteTasks = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }
    const addTask = (title: string) => {
        let newTask = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    return (
        <div className="App">
            <TodoList
                addTask={addTask}
                deleteTasks={deleteTasks}
                title={'What to learn'}
                tasks={tasks}/>
        </div>
    );
}

export default App;
