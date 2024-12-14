const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportlocalMongoose = require('passport-local-mongoose');
// create user schema

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type : String,
        required : true,
        unique: true
    }
});

userSchema.plugin(passportlocalMongoose);

// create user model

const User = mongoose.model('User', userSchema);
module.exports = User;