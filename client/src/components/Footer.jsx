import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6'

export const Footer = () => {
    return (
        <footer className='bg-gray-900'>
            <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-4'>
                <div className="grid lg:grid-cols-6">
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:col-span-4 gap-5'>
                        < div>
                            <p className='font-medium tracking-wider text-gray-300'>Category</p>
                            <ul className='space-y-1 mt-2' >
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>News</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>World</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Games</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>References</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className='font-medium tracking-wider text-gray-300'>Apples</p>
                            <ul className='space-y-1 mt-2' >
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Web</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>eCommerce</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Business</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Entertainment</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className='font-medium tracking-wider text-gray-300'>Cherry</p>
                            <ul className='space-y-1 mt-2' >
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Media</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Brochure</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Nonprofit</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Education</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className='font-medium tracking-wider text-gray-300'>Business</p>
                            <ul className='space-y-1 mt-2' >
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Infopreneur</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Personal</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Wiki</a></li>
                                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-orange-500'>Forum</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='md:max-w-md lg:col-span-2 lg:mt-0 mt-5'>
                        <p className='font-medium tracking-wider text-gray-300'>Subscribe for updates</p>
                        <form className='flex flex-col md:flex-row mt-4'>
                            <input type="email" name="email" id="email" className='flex-grow w-full h-12 rounded px-4 mb-3 transition duration-200 bg-white border border-gray-300 shadow-sm aspect-auto md:mr-2 md:mb-0 focus:border-purple-400 focus:ring-2 focus:outline-none' />
                            <button type='submit' className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md hover:bg-orange-500 focus:online-none border'>Subscribe</button>
                        </form>
                        <p className='text-gray-300 mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque consequatur cumque esse, voluptatum dolorum nemo beatae? At repellat commodi deleniti assumenda autem magnam, consectetur culpa alias, iure nihil exercitationem minima!</p>
                    </div>
                </div>
                <div className='flex justify-between items-center text-center text-gray-300 p-4'>
                    <p>&copy; 2024 | All rights reserved</p>
                    <div className='flex space-x-4'>
                        <a href="" className='text-gray-500 transition-all duration-300 hover:text-orange-500'><FaTwitter className='size-4' /></a>
                        <a href="" className='text-gray-500 transition-all duration-300 hover:text-orange-500'><FaFacebook className='size-4' /></a>
                        <a href="" className='text-gray-500 transition-all duration-300 hover:text-orange-500'><FaInstagram className='size-4' /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
