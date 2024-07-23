const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    products:[]
});

const users = mongoose.model("user",userSchema);

module.exports = users;
