import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = "http://localhost:3000/api/signup"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({ username, password })
        }

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(`Post request successfully: ${data}`)
            })
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h2 className='text-4xl'>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Enter your username' value={username} onChange={(e) => { setUsername(e.target.value) }} required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Enter your super secret password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <button className='w-full bg-orange-500 h-10 rounded shadow-md text-white hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 transition-all ease-in-out duration-300 mt-2'>Signup</button>
            </form>
            <div className='mt-2'>
                Already have an account? <Link to={'/login'} className='underline underline-offset-2'>Login</Link>
            </div>
        </div>
    )
}

export default SignupPage