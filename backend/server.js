require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts');

// express app
const app = express()

// connect mongoose
mongoose.connect(process.env.MONGODB)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`successfully connected to DB and listening on port `, process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// middleware
app.use(express.json())

// routes
app.use('api/posts', postRoutes);

// listen for requests