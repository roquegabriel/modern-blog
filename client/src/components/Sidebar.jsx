import { useEffect, useState } from 'react'
import { FaBookOpenReader } from "react-icons/fa6"
import { Link } from "react-router-dom"
export const Sidebar = () => {
    const [latestPosts, setLatestPosts] = useState([])

    useEffect(() => {
        fetch(`https://mern-blog-bay-gamma.vercel.app/api/latest-posts`)
            .then(res => res.json())
            .then((latestPosts) => setLatestPosts(latestPosts))
    }, [])

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-2">Latest blogs</h3>
            <div className="flex flex-col-reverse gap-4">
                {latestPosts.map(blog => (
                    <div key={blog._id} className='flex flex-col justify-between border-b border-b-gray-300 p-1 lg:h-32'>
                        <p className="">{blog.title}</p>
                        <Link to={`/post/${blog._id}`} className='font-medium hover:text-orange-500 inline-flex items-center gap-2 '>Read article <FaBookOpenReader /></Link>
                    </div>
                ))}
            </div>
        </div>
    )
}