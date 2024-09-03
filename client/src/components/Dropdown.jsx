import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Dropdown = ({ handleLogout, username }) => {

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange-500">
                    <FaUser className='text-white' />
                    {/* <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" /> */}
                </MenuButton>
            </div>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <Link
                            to={'/'}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            Logged in as ({username})
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            to={"/create-post"}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            Create post
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link onClick={handleLogout}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            Logout
                        </Link>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}

export default Dropdown