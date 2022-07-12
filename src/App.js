import React, { Component, useEffect, useState } from 'react';
import './App.css';
import api from './api';
import Form from './components/Form';
import Todo from './components/Todo';

const initialData = [
    {
        _id: 0,
        text: 'Walk dog',
    },
    {
        _id: 1,
        text: 'Work out',
    },
    {
        _id: 2,
        text: 'Finish ReactJS project',
    },
];

const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);
    //const [todos, setTodos]=useState()

    
    const fetchToDos = async () => {
      console.log('all to dos');
        await api.listtasks().then((list) => 
        setTodos(list));
    };
    fetchToDos()
    //useEffect(() => {
      //  fetchToDos();
    //}, []);

    const handleSubmit = () => {
        if (inputValue === '') return;
        const newTodo = { _id: Date.now(), text: inputValue };
        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const handleDeleteTodo = async (id) => {;
        const { status, data } = await api.erase(id);
        if (status === 200) {
            fetchToDos();
        }
        const newTodos = todos.filter((todo) => todo._id !== id);
        setTodos(newTodos);
    };

    const Title = ({ myName }) => {
        return <h1 className='title'>{myName}'s to-do list</h1>;
    };

    return (
        <div className='app'>
            <div className='todolist'>
                <Title myName='AC' />
                <Form
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleSubmit={handleSubmit}
                />
                {todos.map((todo, index) => (
                    <Todo
                        todo={todo}
                        index={index}
                        handleDeleteTodo={handleDeleteTodo}
                        key={todo._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
