import React, { useEffect, useCallback, Fragment, useState } from 'react'
import './Task.css'
import { useBrowser } from '../../context/browser-context';
import { quotes } from '../../db/quotes'

const index = Math.floor(Math.random() * quotes.length);
const quote = quotes[index].quote;

function Task() {
    const [isChecked, setChecked] = useState(JSON.parse(localStorage.getItem('checkedStatus')) || false);
    const { browserDispatch, time, message, name, task } = useBrowser();
    useEffect(() => {
        const userTask = localStorage.getItem('task');
        browserDispatch({
            type: 'TASK',
            payload: userTask
        })
    }, [browserDispatch])

    const getCurrentTime = useCallback(() => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const hour = hours > 9 ? hours : `0${hours}`;
        const minute = minutes > 9 ? minutes : `0${minutes}`;
        const time = `${hour}:${minute}`;

        browserDispatch({
            type: "TIME",
            payload: time
        });
        browserDispatch({
            type: 'MESSAGE',
            payload: hour,
        });

        setTimeout(getCurrentTime, 1000);  // Repeat every second
    }, [browserDispatch]);

    useEffect(() => {
        getCurrentTime();
    }, [getCurrentTime])

    const handleTaskChange = (event) => {
        if (event.key === 'Enter' && event.target.value.length > 0) {
            browserDispatch({
                type: 'TASK',
                payload: event.target.value
            })
            localStorage.setItem('task', event.target.value);
            localStorage.setItem('date', new Date().getDate());
        }
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
    }
    const handleTask = () => {
        setChecked(!isChecked);
        localStorage.setItem('checkedStatus', JSON.stringify(!isChecked));
    }
    const handleClear = () => {
        browserDispatch({
            type: 'CLEAR'
        })
        localStorage.removeItem('task');
        localStorage.removeItem('checkedStatus');

    }

    return (
        <div className='task-container d-flex direction-column align-center '>
            <span className='time'>{time}</span>
            <span className='message'>{message}, {name}</span>
            {name !== null && task === null ? (<Fragment>
                <span className='focus-today'>What's your focus for today? </span>
                <form onSubmit={handleFormSubmit}>
                    <input required className='input input-task' onKeyDown={handleTaskChange} />
                </form>
            </Fragment>)
                :
                (<div className='user-task-container d-flex direction-column align-center gap-sm'>
                    <span className='heading-1'>Today's Focus</span>
                    <div className='container d-flex align-center gap-sm'>
                        <label className={`${isChecked ? 'strike-through' : ""} heading-3 label d-flex align-center gap-sm`}>
                            <input type='checkbox' className='check' onChange={handleTask} checked={isChecked} />
                            {task}
                        </label>
                        <button className='button' onClick={handleClear}>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>
                </div>
                )}
            <div className='quote-container '>
                <span className='heading-3'>{quote}</span>
            </div>


        </div>
    )
}

export default Task