const express = require('express')
const { get_users,
    get_singleUser,
    create_user,
    edit_userInfo } = require('../controllers/userController')

const userRouter = express.Router();

// GET all users
userRouter.get('/', get_users)

// GET single user
userRouter.get('/:username', get_singleUser)

// POST [create] new user
userRouter.post('/', create_user)

// DELETE user

// UPDATE user info
userRouter.patch('/:id', edit_userInfo)

module.exports = userRouter
