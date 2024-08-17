import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../contexts/UserContext"
import { useContext } from 'react'

const LoginPage = () => {
    
    const { setUserInfo } = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = "http://localhost:3000/api/login"
        const options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({ username, password })
        }

        fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Error")
            })
            .then((data) => {
                setUserInfo(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h2 className='text-4xl'>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Enter your username' value={username} onChange={(e) => { setUsername(e.target.value) }} required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Enter your super secret password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <button className='w-full bg-orange-500 h-10 rounded shadow-md text-white hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 transition-all ease-in-out duration-300 mt-2'>Login</button>
            </form>
            <div className='mt-2'>
                Don't have an account? <Link to={'/signup'} className='underline underline-offset-2'>Signup</Link>
            </div>
        </div>
    )
}

export default LoginPage