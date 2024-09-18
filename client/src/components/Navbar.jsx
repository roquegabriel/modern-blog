import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter, FaXmark } from "react-icons/fa6";
import { UserContext } from '../contexts/UserContext';
import Dropdown from "./Dropdown";

export const Navbar = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    //nav items
    const navItems = [
        { path: "/", link: "Home" },
        { path: "/services", link: "Services" },
        { path: "/contact", link: "Contact" },
        { path: "/about", link: "About" },
        { path: "/blogs", link: "Blogs" },
    ]

    useEffect(() => {
        fetch('http://localhost:3000/api/profile', {
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Error")
            })
            .then((data) => {
                setUserInfo(data)
            })
    }, [])

    const handleLogout = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/api/logout', {
            credentials: 'include',
            method: 'POST'
        })
            .then(response => {
                if (response.ok) {
                    setUserInfo({})
                    navigate('/')
                }
            })
    }

    return (
        <header className='bg-black fixed top-0 left-0 right-0'>
            <nav className='p-4 max-w-7xl mx-auto flex items-center justify-between'>
                <a className='text-3xl font-bold text-white' href="/">My <span className="text-orange-500">Blog</span></a>
                {/* navitems for lg devices */}
                <ul className='md:flex items-center gap-6 lg:gap-12 text-lg hidden'>
                    {navItems.map(({ path, link }) => <li className='text-white' key={path}>
                        <NavLink to={path} className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        } >
                            {link}
                        </NavLink></li>)}
                </ul>
                {/* menu icons */}
                <div className="md:flex items-center gap-4 hidden">

                    <div className='md:hidden lg:flex gap-2 text-white'>
                        <a href="/" className="hover:text-orange-500"><FaFacebook /></a>
                        <a href="/" className="hover:text-orange-500"><FaSquareXTwitter /></a>
                        <a href="/" className="hover:text-orange-500"><FaInstagram /></a>
                    </div>

                    {userInfo?.username !== undefined || null ? (
                        <Dropdown handleLogout={handleLogout} username={userInfo.username} className="bg-orange-500 py-2 px-6 font-medium rounded" />
                    ) : (
                        <>
                            <Link to={'/login'} className='bg-orange-500 py-2 px-6 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-300 ease-out'>
                                Login
                            </Link>
                            <Link to={'/signup'} className='bg-white text-orange-500 py-2 px-6 font-medium rounded hover:bg-orange-500 hover:text-white transition-all duration-300 ease-out'>
                                Signup
                            </Link>
                        </>
                    )}

                </div>
                {/* mobile menu */}
                <div className='md:hidden flex items-center gap-2'>
                    {userInfo?.username && (
                        <Dropdown handleLogout={handleLogout} username={userInfo.username} className="bg-orange-500 py-2 px-6 font-medium rounded" />
                    )}
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <FaXmark className='text-white size-5' /> : <FaBars className='text-white size-5' />}
                    </button>
                </div>
            </nav>
            {/* menu items only for mobile */}
            <div className={`md:hidden block space-y-4 px-4 py-6 text-lg bg-white mt-14 ${isMenuOpen ? 'fixed top-0 left-0 w-full transition ' : 'hidden'} `}>
                <ul className=''>
                    {navItems.map(({ path, link }) => <li className='text-black' key={path}><NavLink onClick={toggleMenu} to={path}>{link}</NavLink></li>)}
                </ul>
                {!userInfo?.username && (
                    <div className="text-center">
                        <Link to={'/login'} className='bg-orange-500 py-2 px-6 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-300 ease-out' onClick={toggleMenu}>
                            Login
                        </Link>
                        <Link to={'/signup'} className='bg-white text-orange-500 py-2 px-6 font-medium rounded hover:bg-orange-500 hover:text-white transition-all duration-300 ease-out' onClick={toggleMenu}>
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}