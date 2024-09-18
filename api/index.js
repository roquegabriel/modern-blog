const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('./models/User')
const Blog = require('./models/Blog')
const Category = require('./models/Category')
const cookieParser = require('cookie-parser')
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
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

const client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
})

const deleteObject = async (objKey) => {
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: objKey,
    })

    try {
        const response = await client.send(command);
        console.log(response)
    } catch (err) {
        console.error(err)
    }
}

const uploadToS3 = async (path, originalFilename, mimetype) => {

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
        try {
            const userDoc = await User.create({
                username, password: hash
            })
            res.json({ userDoc })
        } catch (error) {
            res.status(409).json({ error })
        }
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
                const token = jwt.sign({ id: userDoc._id, username }, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
                res.cookie('token', token).json({ username })
            } else {
                res.status(400).json({ error: 'login failed' })
            }
        })
    } else {
        res.status(400).json({ error: 'login failed' })
    }
})

app.post('/api/create', upload.single('cover'), async (req, res) => {
    const { title, category, tags, content, readingTime, cover } = req.body
    const { originalname, path, mimetype } = req.file
    const { token } = req.cookies
    const topics = JSON.parse(tags)
    const categories = JSON.parse(category)
    jwt.verify(token, publicKey, async (err, decoded) => {
        if (err) throw err
        const url = await uploadToS3(path, originalname, mimetype)
        const blogDoc = await Blog.create({
            title, category: categories[0]._id, tags: topics.map(({ _id }) => _id), content, cover: url, readingTime, author: decoded.id
        })
        res.json(blogDoc)
    })
})
app.put('/api/edit/:id', upload.single('cover'), async (req, res) => {

    const id = req.params.id
    const categories = JSON.parse(req.body.category)
    const tags = JSON.parse(req.body.tags)
    const { token } = req.cookies

    jwt.verify(token, publicKey, async (err, decoded) => {
        if (err) {
            res.status(401).json(err)
        } else {
            const update = {
                title: req.body.title,
                content: req.body.content,
                readingTime: req.body.readingTime,
                category: categories[0]._id,
                tags: tags.map(({ _id }) => _id),
            }
            if (req.file) {
                const { originalname, path, mimetype } = req.file
                const url = await uploadToS3(path, originalname, mimetype)
                update['cover'] = url
                await deleteObject(req.body.objKey)
            }
            const postDoc = await Blog.findByIdAndUpdate(id, update)
            res.status(200).json(postDoc)
        }
    })


})

app.get('/api/categories', async (req, res) => {
    const categories = await Category.find({})
    res.json(categories)
})

app.get('/api/filtered-categories', async (req, res) => {
    const categories = []
    const blogCategories = await Blog.find()
        .distinct('category')
        .exec()
    for (let i = 0; i < blogCategories.length; i++) {
        const category = await Category.findById(blogCategories[i]).exec()
        categories.push(category)
    }
    res.json(categories)
})

app.get('/api/profile', (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, publicKey, async (err, decoded) => {
            if (err) throw err
            res.json({ username: decoded.username })
        })
    }
})
app.get('/api/blogs', async (req, res) => {
    let { category, limit, page } = req.query
    let skip = parseInt(page) === 1 ? 0 : (parseInt(page) * parseInt(limit)) - parseInt(limit)
    if (category === 'all') {
        category = {}
    } else {
        category = { category: category }
    }
    const blogs = await Blog.find(category)
        .populate('author', 'username')
        .populate('category')
        .limit(limit)
        .skip(skip)
        .exec()
    const numBlogs = await Blog.countDocuments(category)
    res.json({ numBlogs, blogs })
})
app.get('/api/post/:id', async (req, res) => {
    const id = req.params.id
    const postDoc = await Blog.findById(id)
        .populate('author', 'username')
        .populate('category')
        .populate('tags')
        .exec()
    res.json(postDoc)
})
app.get('/api/latest-posts', async (req, res) => {
    const skip = await Blog.estimatedDocumentCount() - 5
    const latestPosts = await Blog.find({}).skip(skip)
    res.status(200).json(latestPosts)
})
app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json({ message: 'Logout successfully' })
})

app.get('/api/test', (req, res) => {
    res.json({ message: 'Message in a bottle' })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})