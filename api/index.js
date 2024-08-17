const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('./models/User')
const Blog = require('./models/Blog')
const Category = require('./models/Category')
const cookieParser = require('cookie-parser')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const multer = require('multer')
const upload = multer({ dest: '/tmp' })
const fs = require('fs')
const bucket = "weblog-app-bucket"

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
require('dotenv').config()

const saltRounds = 10

const mongoose = require('mongoose')
const { error } = require('console')

const connection = async () => {
    await mongoose.connect(process.env.MONGO_URL)
}

connection().catch(err => console.log(err))

const uploadToS3 = async (path, originalFilename, mimetype) => {
    const client = new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    })

    const parts = originalFilename.split('.')
    const ext = parts[parts.length - 1]
    const newFilename = Date.now() + '.' + ext

    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFilename,
        ContentType: mimetype,
        ACL: 'public-read'
    }))

    return `https://${bucket}.s3.amazonaws.com/${newFilename}`
}



app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) throw err
        const userDoc = await User.create({
            username, password: hash
        })
        res.json({ userDoc })
    })
})
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    }
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const userDoc = await User.findOne({ username }).exec()
    if (userDoc) {
        bcrypt.compare(password, userDoc.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ id: userDoc._id, username }, privateKey, { algorithm: 'RS256' })
                res.cookie('token', token).json({
                    username

                })
            } else {
                res.json({ error: "Credentials wrong" })
            }
        })
    } else {
        res.json({ error: "Credentials wrong" })
    }
})

app.post('/api/create', upload.single('cover'), async (req, res) => {
    const { title, category, tags, content, readingTime, cover } = req.body
    const { originalname, path, mimetype } = req.file
    const { token } = req.cookies
    const tagsArr = JSON.parse(tags)
    jwt.verify(token, publicKey, async (err, decoded) => {
        if (err) throw err
        const url = await uploadToS3(path, originalname, mimetype)
        const blogDoc = await Blog.create({
            title, category: category[0]._id, tags: tagsArr.map(({ _id }) => _id), content, cover: url, readingTime, author: decoded.id
        })
        res.json(blogDoc)
    })
})

app.get('/api/categories', async (req, res) => {
    const categories = await Category.find({})
    res.json({ categories })
})

app.get('/api/profile', (req, res) => {
    const { token } = req.cookies
    jwt.verify(token, publicKey, async (err, decoded) => {
        if (err) throw new Error("Error")        
        res.json({ decoded })
    })
})
app.post('/api/logout',(req,res) => {
    res.cookie('token','').json({message:'Logout successfully'})
})

app.get('/api/test', (req, res) => {
    res.json({ message: 'Message in a bottle' })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})