import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";

const BlogCards = ({ blogs }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
      {
        blogs.map((blog) => (
          <Link key={blog._id} to={`/post/${blog._id}`} className='p-5 shadow-lg rounded cursor-pointer flex flex-col justify-between' >
            <div>
              <img src={blog.cover} alt="" className='w-full aspect-video' />
            </div>
            <h3 className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer'>
              {blog.title}
            </h3>

            <div className='flex justify-between mb-2 text-gray-600 text-sm'>
              <span >
                <strong>By</strong> {blog.author.username}
              </span>
              <span>{blog.readingTime} min read</span>
            </div>
            <p className='text-gray-500 text-sm'>Published at: {moment(blog.publishedDate).format('LL')}</p>
          </Link>
        ))
      }
    </div>
  )
}

BlogCards.propTypes = {
  blogs: PropTypes.array
}

export default BlogCards