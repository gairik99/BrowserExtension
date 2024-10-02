import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import './Todo.css'

export const Todo = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todo')) || []);

    const handleInput = (event) => {
        setTodo(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && todo.trim()) {
            const updatedTodoList = [...todoList, { _id: uuid(), todo, isCompleted: false }];
            setTodoList(updatedTodoList);
            setTodo("");
            localStorage.setItem('todo', JSON.stringify(updatedTodoList));

        }

    }
    const handleTodoChange = (todoId) => {
        const updatedTodoList = todoList.map(todo => todoId === todo._id ? { ...todo, isCompleted: !todo.isCompleted } : todo);
        setTodoList(updatedTodoList);
        localStorage.setItem('todo', JSON.stringify(updatedTodoList));
    }
    const handleDelete = (todoId) => {
        const updatedTodoList = todoList.filter(({ _id }) => todoId !== _id)
        setTodoList(updatedTodoList);
        localStorage.setItem('todo', JSON.stringify(updatedTodoList));
    }
    return (
        <div className='todo-container absolute'>
            <div className='todo-input-container'>
                <input onChange={handleInput} onKeyDown={handleKeyDown} value={todo} className='todo-input' />
            </div>
            <div className='todo-list'>
                {
                    todoList && todoList.map(({ _id, isCompleted, todo }) => {
                        return (
                            <div key={_id} className='todo-items d-flex align-center'>
                                <label className={`${isCompleted ? 'strike-through' : ''} todo-label`}><input type='checkbox' className='todo-check' onChange={() => handleTodoChange(_id)} checked={isCompleted} />{todo}
                                </label>
                                <button className='button todo-clear-btn' onClick={() => handleDelete(_id)}>
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                        )
                    })
                }

            </div>
        </div >
    )
}

