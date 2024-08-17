import React from 'react'
import Blogs from '../components/Blogs'

const BlogsPage = () => {
  return (
    <div>
      <div className='py-40 bg-black text-center text-white px-4'>
        <h2 className='text-5xl lg:text-7xl leading-snug font-bold'>Blog page</h2>
      </div>
      {/* Blogs container */}
      <div className='max-w-7xl'>
        <Blogs />
      </div>
    </div>
  )
}

export default BlogsPage