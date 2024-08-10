const express = require('express')
const app = express()
const port = 3000

app.get('/test', (req, res) => {
    res.json({ message: 'Message in a bottle'})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})