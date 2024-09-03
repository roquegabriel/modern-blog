import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
export const Sidebar = () => {
    const [latestPosts, setLatestPosts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/api/latest-posts`)
            .then(res => res.json())
            .then((latestPosts) => setLatestPosts(latestPosts))
    }, [])

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-2">Latest blogs</h3>
            <div className="flex flex-col-reverse gap-2 min-w-0">
                {latestPosts.map(blog => (
                    <>
                        <Link to={`/post/${blog._id}`} className='font-medium hover:text-orange-500 inline-flex items-center gap-2'>Read article <FaArrowRight /></Link>
                        <p key={blog._id} className="truncate">{blog.title}</p>
                    </>
                ))}
            </div>
        </div>
    )
}