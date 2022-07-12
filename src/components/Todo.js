import React, { useState } from 'react';

const Todo = ({ todo, index, handleDeleteTodo }) => {
    return (
        <div className='todo'>
            <span className='todo-text'>
                {index + 1}. {todo.text}
            </span>
            <span
                onClick={() => handleDeleteTodo(todo._id)}
                className='todo-delete'
            >
                x
            </span>
        </div>
    );
};

export default Todo;
