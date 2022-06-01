import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "Type Script", isDone: true},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Redux", isDone: false}
    ])

    const deleteTasks = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    return (
        <div className="App">
            <TodoList
                deleteTasks={deleteTasks}
                title={'What to learn'}
                tasks={tasks}/>
        </div>
    );
}

export default App;
