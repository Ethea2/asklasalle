const User = require('../models/usersModel')
const mongoose = require('mongoose')

// GET all users
const get_users = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

// GET a single user
const get_singleUser = async (req, res) =>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'This user does not exist'})
    }

    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({error: 'This user does not exist!'})
    }
    res.status(200).json(user)
}

// CREATE a new user
const create_user = async (req, res) => {
    const {email, password, username, displayName, bio, numPosts} = req.body
    try {
        const user = await User.create({email, password, username, displayName, bio, numPosts})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// EDIT user info

const edit_userInfo = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'This user does not exist'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!user){
        return res.status(404).json({error: 'This user does not exist!'})
    }
    res.status(200).json(user)
}

module.exports = {
    get_users,
    get_singleUser,
    create_user,
    edit_userInfo
}