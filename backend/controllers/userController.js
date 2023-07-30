const User = require('../models/usersModel')
const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');
const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinary')
const jwt = require('jsonwebtoken')

// GET all users
const get_users = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

// GET a single user
const get_singleUser = async (req, res) => {
    const { username } = req.params
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({ error: 'This user does not exist' })
    // }

    const user = await User.find({ "username" : username }).select({})
    if (!user) {
        return res.status(404).json({ error: 'This user does not exist!' })
    }
    res.status(200).json(user)
}

// CREATE a new user
const create_user = async (req, res) => {
    const displayName = uniqueNamesGenerator({
        dictionaries: [colors, animals],
        separator: " ",
        style: "capital"
    });

    const img = `https://picsum.photos/200?random=${Math.random()}`

    const { email, password, username } = req.body
    try {
        const user = await User.create({ email, password, username, displayName, img })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// EDIT user info

const edit_userInfo = async (req, res) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This user does not exist' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!user) {
        return res.status(404).json({ error: 'This user does not exist!' })
    }
    res.status(200).json(user)
}

//EDIT user picture
const edit_user_picture = async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    const file = req.files.img

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This user does not exist' })
    }

    try {
        console.log(file)
        const result = await cloudinary.uploader.upload(file.tempFilePath , {
            public_id: Date.now(),
            folder: "images",
            width: 200,
            height: 200,
            crop: "scale", 
        })

        const user = await User.findOneAndUpdate({ _id: id }, {
            img: result.secure_url
        })

        if (!user) {
            return res.status(404).json({ error: 'This user does not exist!' })
        }
        res.status(200).json(user)
    } catch (err) {
        return res.status(404).json({ error: err })
    }

}

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async(req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async(req, res) => {
    const { email, password, username } = req.body

    try{
        const user = await User.signup(email, password, username)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    get_users,
    get_singleUser,
    create_user,
    edit_userInfo,
    edit_user_picture,
    loginUser, 
    signupUser
}