require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

const app = express();

app.use(express.json())
app.use('/api/Gamers/users',userRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('Listening on port 4000')
        })
    })
    .catch((error)=>{
        console.log(error)
    })