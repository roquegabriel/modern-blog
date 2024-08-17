import React, { useEffect, useState } from 'react'
import Select from "react-dropdown-select"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreateBlogPage = () => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [content, setContent] = useState('')
    const [cover, setCover] = useState('')
    const [readingTime, setReadingTime] = useState(1)


    useEffect(() => {
        fetch('http://localhost:3000/api/categories', {
            method: "GET"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Something went wrong")
            })
            .then((data) => {
                setCategories(data.categories)
            }).catch((error) => {
                console.error(error)
            })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('category', category)
        data.set('tags', JSON.stringify(tags))
        data.set('content', content)
        data.set('cover', cover[0])
        data.set('readingTime', readingTime)

        const url = "http://localhost:3000/api/create"
        const options = {
            method: "POST",
            credentials: "include",
            body: (data)
        }

        fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Something went wrong")
            })
            .then((data) => {
                console.log(`Post request successfully: ${data}`)
            })
            .catch((error) => {
                console.log(error)
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
        <div className='h-screen md:w-2/3 mx-auto flex flex-col justify-center items-center p-2'>
            <h2 className='text-3xl'>Create post</h2>
            <div className="w-full">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" name="title" id="title" placeholder='Title' className='' value={title} onChange={(e) => { setTitle(e.target.value) }} />

                    <Select
                        style={{ 'borderColor': '#6b7280', 'borderRadius': '0.25rem', 'fontSize': '1.125rem', 'height': '2.5rem', 'marginBottom': '0.5rem' }}
                        labelField="category"
                        valueField="_id"
                        options={categories}
                        values={category}
                        placeholder='Category'
                        onChange={(value) => setCategory(value)} />

                    <Select
                        style={{ 'borderColor': '#6b7280', 'borderRadius': '0.25rem', 'fontSize': '1.125rem', 'height': '2.5rem' }}
                        multi
                        labelField="category"
                        valueField="_id"
                        color='#f97316'
                        name='tags'
                        placeholder='Tags'
                        closeOnSelect={true}
                        options={categories}
                        onChange={(values) => setTags(values)}
                    />

                    <input type="file" name="cover" id="cover" className='file:h-10 file:mt-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-white hover:file:text-orange-500 hover:file:border file:border-orange-500 file:transition-all file:ease-out file:duration-300 mb-2' onChange={(e) => { setCover(e.target.files) }} />
                    <input type="number" name="readingTime" id="readingTime" placeholder='Read time' min={1} step={1} max={60} value={readingTime} onChange={(e) => { setReadingTime(e.target.value) }} />


                    <ReactQuill modules={modules} theme='snow' value={content} onChange={setContent} />


                    <button className='w-full bg-orange-500 h-10 mt-2 rounded shadow-md text-white hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 transition-all ease-in-out duration-300'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateBlogPage