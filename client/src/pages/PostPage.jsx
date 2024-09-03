import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from "moment"
import { UserContext } from '../contexts/UserContext'
import { Toaster } from 'react-hot-toast'

const PostPage = () => {

  const [post, setPost] = useState('')
  const { id } = useParams()
  const { userInfo } = useContext(UserContext)

  useEffect(() => {
    const url = `http://localhost:3000/api/post/${id}`
    fetch(url)
      .then((response) => response.json())
      .then((postDoc) => setPost(postDoc))
  }, [])



  return (
    <div className="grid place-content-center max-w-5xl mx-auto pt-20">
      <Toaster />
      <figure className=''>
        <img src={post.cover} alt="Picture" className='w-full' />
        <figcaption>
          <h2 className="text-center">{post.title}</h2>
        </figcaption>
      </figure>
      <div className="flex flex-col justify-center items-center mt-0 mb-2">
        <p><strong>By</strong> {post.author?.username}</p>

        {userInfo.username === post.author?.username && (
          <Link to={`/edit-post/${id}`} className='flex items-center gap-1 border border-orange-500 py-1 px-2 rounded'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>Edit post
          </Link>
        )}

        <p>Published at: {moment(post.publishedDate).format('LL')}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }}>
      </div>
    </div>
  )
}

export default PostPage