const express = require('express')
const { get_users,
    get_singleUser,
    create_user,
    edit_userInfo, 
    edit_user_picture} = require('../controllers/userController')

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

// UPDATE user picture
userRouter.post('/:id/picture', edit_user_picture)


module.exports = userRouter

//test