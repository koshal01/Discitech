const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    hash:{
        type: String
    },
    salt:{
        type: String
    },
    facebookId: String,
    googleId: String,
    githubId: String,
    resetToken: String,
    expireToken: Date
});

const User = mongoose.model("user",userSchema);
module.exports = User;