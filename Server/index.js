const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./Routes/userRoute')
const mongoose = require('mongoose')
app.use(bodyParser.urlencoded({extended: true, limit: true}))
app.use(bodyParser.json())
app.use(cors())
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL, (err)=>{
    if(err){
        console.log(`mongoDB not connect`);
    }else{
        console.log(`MongoDB connected`);
    }
})
app.use('/auth', userRouter)
const PORT = process.env.PORT
const server = app.listen(PORT || 5000, ()=>{
    console.log(`app is listening on port: ${PORT}`);
})