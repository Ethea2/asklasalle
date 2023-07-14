require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGODB)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`successfully connected to DB and listening on port `, process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })