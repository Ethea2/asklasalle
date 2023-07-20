require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users')

// express app
const app = express()


// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

// routes
app.use('/api/askposts', postRoutes);
app.use('/api/user', userRoutes)
app.use('/api/test', (req, res) => {
    res.send("okay!")
})

// connect mongoose
mongoose.connect(process.env.MONGODB, {
    dbName: 'forum',
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`successfully connected to DB and listening on port`, process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// app.use('api/user');
// app.use('api/comments');

// listen for requests