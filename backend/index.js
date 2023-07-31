require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const file_upload = require('express-fileupload')
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users')
const cors = require('cors')


// express app
const app = express()
app.use(cors())
app.use(cors({
    origin: [],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials:true
}))

// middleware
app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));

app.use(file_upload({useTempFiles: true}))

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