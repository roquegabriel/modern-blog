import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from "../contexts/UserContext"
import { useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {

    const { setUserInfo } = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `${import.meta.env.VITE_API_URL}/login`
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
                console.log(response)
                if (!response.ok) {
                    return toast.error('Login failed!')
                } else {
                    setRedirect(true)
                    return response.json()
                }
            })
            .then((data) => {
                setUserInfo(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }


    return (
        <div className='h-screen flex flex-col justify-center items-center md:w-1/2 lg:w-1/3 mx-auto p-2'>
            <Toaster />
            <h2 className='text-4xl'>Login</h2>
            <form onSubmit={handleSubmit} className='w-full'>
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