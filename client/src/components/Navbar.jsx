import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter, FaXmark } from "react-icons/fa6";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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

    return (
        <header className='bg-black fixed top-0 left-0 right-0'>
            <nav className='p-4 max-w-7xl mx-auto flex items-center justify-between'>
                <a className='text-3xl font-bold text-white' href="/">My <span className="text-orange-500">Blog</span></a>
                {/* navitems for lg devices */}
                <ul className='md:flex items-center gap-12 text-lg hidden'>
                    {navItems.map(({ path, link }) => <li className='text-white' key={path}>
                        <NavLink to={path} className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        } >
                            {link}
                        </NavLink></li>)}
                </ul>
                {/* menu icons */}
                <div className="text-white lg:flex items-center gap-4 hidden">
                    <a href="/" className="hover:text-orange-500"><FaFacebook /></a>
                    <a href="/" className="hover:text-orange-500"><FaSquareXTwitter /></a>
                    <a href="/" className="hover:text-orange-500"><FaInstagram /></a>
                    <button className='bg-orange-500 py-2 px-6 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-300 ease-out'>Login</button>
                </div>
                {/* mobile menu */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu}>
                        {
                            isMenuOpen ? <FaXmark className='text-white size-5' /> : <FaBars className='text-white size-5' />
                        }
                    </button>
                </div>
            </nav>
            {/* menu items only for mobile */}
            <div className=''>
                <ul className={`md:hidden block space-y-4 px-4 py-6 text-lg bg-white mt-14 ${isMenuOpen ? 'fixed top-0 left-0 w-full transition ' : 'hidden'} `}>
                    {navItems.map(({ path, link }) => <li className='text-black' key={path}><NavLink onClick={toggleMenu} to={path}>{link}</NavLink></li>)}
                </ul>
            </div>
        </header>
    )
}
