import React, { useEffect, useState } from 'react'
import Select from "react-dropdown-select"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Toaster, toast } from 'react-hot-toast'
import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditBlogPage = () => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [content, setContent] = useState('')
    const [cover, setCover] = useState(null)
    const [readingTime, setReadingTime] = useState(1)

    const imageUrl = useRef('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const url = `https://mern-blog-bay-gamma.vercel.app/api/post/${id}`
        fetch(url)
            .then((response) => response.json())
            .then((postDoc) => {
                setTitle(postDoc.title)
                setContent(postDoc.content)
                setReadingTime(postDoc.readingTime)
                setCategory([postDoc.category])
                setTags(postDoc.tags)
                imageUrl.current = postDoc.cover
            })
    }, [])

    useEffect(() => {
        fetch('https://mern-blog-bay-gamma.vercel.app/api/categories', {
            method: "GET"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Something went wrong")
            })
            .then((categories) => {
                setCategories(categories)
            }).catch((error) => {
                console.error(error)
            })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.set('title', title)
        data.set('category', JSON.stringify(category))
        data.set('tags', JSON.stringify(tags))
        data.set('content', content)

        if (typeof cover === 'object' && cover !== null) {
            let imgUrl = imageUrl.current
            let parts = imgUrl.split('/')
            let key = parts[parts.length - 1]
            data.set('cover', cover[0])
            data.set('objKey', key)
        }

        data.set('readingTime', readingTime)

        const url = `https://mern-blog-bay-gamma.vercel.app/api/edit/${id}`
        const options = {
            method: "PUT",
            credentials: "include",
            body: (data)
        }

        fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return toast.success('Post edited successfully')
                }
                return toast.error("Something went wrong")
            }).then(() => {
                navigate(-1)
            })

    }
    const modules = {

        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image'],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ]
    }

    return (
        <div className='h-screen md:w-3/5 mx-auto flex flex-col justify-center items-center pt-16'>
            <h2 className='text-3xl'>Edit post</h2>
            <Toaster />
            <div className="w-full">
                <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate className="group">
                    <input type="text" name="title" id="title" placeholder='Title' className='peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-pink-500 ' pattern='.{3,}' value={title} onChange={(e) => { setTitle(e.target.value) }} required />
                    <p className="hidden -mt-1 text-sm text-pink-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Invalid title</p>

                    <Select
                        style={{ 'borderColor': '#6b7280', 'borderRadius': '0.25rem', 'fontSize': '1.125rem', 'height': '2.5rem', 'marginBottom': '0.5rem' }}

                        labelField="category"
                        valueField="_id"
                        searchBy='category'
                        options={categories}
                        values={category}
                        placeholder='Category'
                        onChange={(value) => setCategory(value)}
                        required
                    />

                    <Select
                        style={{ 'borderColor': '#6b7280', 'borderRadius': '0.25rem', 'fontSize': '1.125rem', 'height': '2.5rem' }}
                        multi
                        searchBy='category'
                        labelField="category"
                        valueField="_id"
                        color='#f97316'
                        name='tags'
                        placeholder='Tags'
                        closeOnSelect={true}
                        options={categories}
                        values={tags}
                        onChange={(values) => setTags(values)}
                        required />

                    <input type="file" name="cover" id="cover" className='file:h-10 file:mt-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-white hover:file:text-orange-500 hover:file:border file:border-orange-500 file:transition-all file:ease-out file:duration-300 mb-2' onChange={(e) => { setCover(e.target.files) }} />

                    <input type="number" name="readingTime" id="readingTime" placeholder='Read time' min={1} step={1} max={60} value={readingTime === 1 ? '' : readingTime} onChange={(e) => { setReadingTime(e.target.value) }} required />

                    <ReactQuill modules={modules} theme='snow' value={content} onChange={setContent} />

                    <button className='w-full bg-orange-500 h-10 mt-2 rounded shadow-md text-white hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 transition-all ease-in-out duration-300 group-invalid:pointer-events-none group-invalid:opacity-60'>Edit</button>
                </form>
            </div>
        </div>
    )
}

export default EditBlogPage