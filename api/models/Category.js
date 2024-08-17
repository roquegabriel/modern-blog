const { Schema, model } = require("mongoose")

const categorySchema = new Schema({
    category: String
})

const Category = model('Category', categorySchema)
module.exports = Category