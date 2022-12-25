const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config({path:"./.env"})


const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        min: 10,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default: false
    },
    tokens : [
       { 
            token :{
                type : String,
                required : true 
            }
        }
    ]
})


// hashing password logic
UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// generate token on login
UserSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token})
        await this.save();
        return token;

    }catch(err){
        console.log(err);
    }
}


const User = mongoose.model('users', UserSchema);

module.exports = User;