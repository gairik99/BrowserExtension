import React from 'react'
import './Home.css'
import { useBrowser } from '../../context/browser-context'

function Home() {
    const { browserDispatch } = useBrowser();
    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    const handleNameChange = (event) => {
        if (event.key === 'Enter' && event.target.value.length > 0) {
            browserDispatch({
                type: 'NAME',
                payload: event.target.value
            })
            localStorage.setItem('name', event.target.value);
        }

    }
    return (
        <div className='home-container d-flex direction-column align-center gap-lg'>
            <h1 className='main-heading'>Easy Life</h1>
            <div className='user-details d-flex direction-column gap'>
                <span className='heading-1'>Hi,what's your name?</span>
                <form onSubmit={handleFormSubmit}>
                    <input className='input' required onKeyDown={handleNameChange} />
                </form>
            </div>
        </div>
    )
}

export default Home