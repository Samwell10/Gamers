const express = require('express')
const{
    userLogin,
    userSignup
} = require('../controllers/userController')

const router = express.Router()


//for login
router.post('/login', userLogin)

//for signup
router.post('/signup', userSignup)

module.exports = router