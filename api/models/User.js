const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    username: { type: String, require: true, min: 4, unique: true },
    password: { type: String, require: true },
    pictureProfile: String
})

const User = model('User', UserSchema)
module.exports = User