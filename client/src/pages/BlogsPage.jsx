import { useState } from 'react'
import { useEffect } from 'react'
import BlogCards from '../components/BlogCards'
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'

const BlogsPage = () => {

  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [numBlogs, setNumBlogs] = useState(0)
  const pageSize = 6

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/filtered-categories`, {
      headers: {
        "content-type": "application/json",
      }
    })
      .then(response => response.json())
      .then((categories) => {
        setCategories(categories)
      })
  }, [])


  useEffect(() => {
    async function fetchBlogs() {
      const url = `${import.meta.env.VITE_API_URL}/blogs?page=${currentPage}&limit=${pageSize}&category=${selectedCategory}`
      const response = await fetch(url)
      const { blogs, numBlogs } = await response.json()
      setBlogs(blogs)
      setNumBlogs(numBlogs)
      console.log(import.meta.env.VITE_API_URL)
    }

    fetchBlogs()

  }, [currentPage, pageSize, selectedCategory])

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      {/* <div className='py-40 bg-black text-center text-white px-4'>
        <h2 className='text-5xl lg:text-7xl leading-snug font-bold'>Blog page</h2>
      </div> */}
      {/* Blogs container */}
      <div className='max-w-7xl mx-auto '>
        {/* Category section */}
        <div className='flex gap-2 py-4 px-2 justify-around items-center flex-wrap border-b border-b-black'>
          <Link onClick={() => { setSelectedCategory('all') }} className={`${selectedCategory === 'all' ? 'active' : ''}`}>All</Link>
          {categories.map((category) => (
            <Link onClick={() => { setSelectedCategory(category._id) }} key={category._id} className={`${category._id === selectedCategory ? 'active' : ''}`} >{category.category}</Link>
          ))}
        </div>

        {/* Blog card section */}
        <div className='grid lg:grid-cols-[4fr_1fr] p-2'>
          {/* Blog card component */}
          <div>
            <BlogCards blogs={blogs} currentPage={currentPage} selectedCategory={selectedCategory} pageSize={pageSize} />
          </div>
          {/* sidebar component */}
          <div className='shrink-0 p-2'>
            <Sidebar numBlogs={numBlogs} />
          </div>
        </div>

        {/* pagination section */}
        <div className="py-4 border-t border-t-black mt-8" >
          <Pagination onPageChange={onPageChange} currentPage={currentPage} blogs={blogs} pageSize={pageSize} numBlogs={numBlogs} />
        </div>
      </div>
    </div>
  )
}

export default BlogsPage