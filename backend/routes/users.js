const express = require('express')
const { get_users,
    get_singleUser,
    create_user,
    edit_userInfo, 
    edit_user_picture,
    loginUser, signupUser, fetch_user_by_email, refresh_token} = require('../controllers/userController');
const requireAuth = require('../middlewear/requireAuth');

const userRouter = express.Router();

// GET all users
userRouter.get('/', get_users)

// GET single user
userRouter.get('/:username', get_singleUser)

// POST [create] new user
userRouter.post('/', create_user)

//fetch user by email
userRouter.get('/email/:email', fetch_user_by_email)

// DELETE user

//login route
userRouter.post('/login', loginUser)

//signup route
userRouter.post('/signup', signupUser)

// use auth
userRouter.use(requireAuth)

// UPDATE user info
userRouter.patch('/:id', edit_userInfo)

// UPDATE user picture
userRouter.post('/:id/picture', edit_user_picture)

//REFRESH   
userRouter.post('/refresh', refresh_token)

module.exports = userRouter