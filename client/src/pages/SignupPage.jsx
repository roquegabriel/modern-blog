import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const SignupPage = () => {
    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
    }
    const [input, setInput] = useState(initialState)
    const [error, setError] = useState(initialState)

    const onInputChange = (e) => {
        const { name, value } = e.target
        setInput(prev => ({
            ...prev,
            [name]: value,
        }))
        validateInput(e)
    }

    const validateInput = (e) => {
        let { name, value } = e.target
        let result = false
        setError((prev) => {
            const stateObj = { ...prev, [name]: '' }
            switch (name) {
                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter a username "
                    } else {
                        const regex = new RegExp('^[A-Za-z0-9]{3,16}$')
                        result = regex.test(value)
                        if (!result) {
                            stateObj[name] = "Invalid username"
                        }
                    }
                    break
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter a password"
                        stateObj["confirmPassword"] = ""
                    } else {
                        const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
                        result = regex.test(value)
                        if (!result) {
                            stateObj[name] = "Minimun 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                        } else if (input.confirmPassword && value !== input.confirmPassword) {
                            stateObj["confirmPassword"] = "Passwords do not match"
                        }
                    }
                    break
                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = error.password ? "" : "Please confirm your password"
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Passwords don't match"
                    }
                    break
                default:
                    break
            }
            return stateObj
        })
    }

    const clearState = () => {
        setInput({ ...initialState })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isFormValid = Object.values(error).every(err => err === '')

        if (isFormValid) {

            const url = `${import.meta.env.VITE_API_URL}/signup`
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({ username: input.username, password: input.password })
            }

            fetch(url, options)
                .then((response) => {
                    if (response.ok) {
                        return toast.success('Congratulations, your account has been successfully created')
                    }
                    toast.error('Something went very wrong')
                })
                .then(clearState)

        } else {
            console.error("We're having trouble. Please try again later.")
        }

    }

    return (
        <div className='h-screen flex flex-col justify-center items-center md:w-1/2 lg:w-1/3 mx-auto p-2'>
            <Toaster />
            <h2 className='text-4xl'>Signup</h2>
            <form onSubmit={handleSubmit} className='w-full'>

                <label htmlFor="username">Username
                    <input type="text" name="username" id="username" placeholder='Enter your username' value={input.username} onChange={onInputChange} onBlur={validateInput} required />
                    {error.username && <p className='text-sm -mt-2 text-pink-600'>{error.username}</p>}
                </label>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Enter your super secret password' value={input.password} onChange={onInputChange} onBlur={validateInput} required />
                {error.password && <p className='text-sm -mt-2 text-pink-600'>{error.password}</p>}

                <label htmlFor="confirm">Confirm password</label>
                <input type="password" name="confirmPassword" id="confirm" placeholder='Enter again your super secret password' value={input.confirmPassword} onChange={onInputChange} onBlur={validateInput} required />
                {error.confirmPassword && <p className='text-sm -mt-2 text-pink-600' >{error.confirmPassword}</p>}

                <button className='w-full bg-orange-500 h-10 rounded shadow-md text-white hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 transition-all ease-in-out duration-300 mt-2'>Signup</button>

            </form>
            <div className='mt-2'>
                Already have an account? <Link to={'/login'} className='underline underline-offset-2'>Login</Link>
            </div>
        </div>
    )
}

export default SignupPage