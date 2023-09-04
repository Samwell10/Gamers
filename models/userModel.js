const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    fullName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true,
        unique: true
    }
})

userSchema.statics.signup = async function(email, password, fullName, userName, phone){

    //validators
    if(!email || !password || !fullName || !userName || !phone){
        throw Error("All Fields must be filled")
    }
    
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }


    const exist = await this.findOne({email})
    if(exist){
        throw Error('Email already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) 

    const user = await this.create({email, password: hash, fullName, userName, phone})

    return user
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All Fields must be filled")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user


}

module.exports = mongoose.model('Users', userSchema);