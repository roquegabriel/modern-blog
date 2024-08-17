const mongoose = require('mongoose')
const { Schema, model } = mongoose

const BlogSchema = new Schema({
    title: String,
    cover: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    publishedDate: { type: Date, default: Date.now() },
    readingTime: Number,
    content: String,
    tags: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
})

const Blog = model('Blog', BlogSchema)
module.exports = Blog