const express = require('express')
const userController = require('../Controller/userController')
const userRouter = express.Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/chatHome', userController.chatHome)

module.exports = userRouter