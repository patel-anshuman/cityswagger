const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: String,
    name : String,
    email : String,
    password : String,
    phone: String
},{
    versionKey: false
});

const UserModel = mongoose.model('user',userSchema);

//Export model
module.exports = { UserModel };