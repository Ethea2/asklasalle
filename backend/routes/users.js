const express = require('express')
const { get_users,
    get_singleUser,
    create_user,
    edit_userInfo, 
    edit_user_picture,
    loginUser, signupUser, fetch_user_by_email} = require('../controllers/userController')

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

//login route
userRouter.post('/login', loginUser)

//signup route
userRouter.post('/signup', signupUser)

//fetch user by email
userRouter.get('/email/:email', fetch_user_by_email)

module.exports = userRouter