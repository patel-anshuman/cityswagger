const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ['MR', 'MRS', 'MS', 'MISS', 'MX', 'DOCTOR']
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

const UserModel = mongoose.model('user',userSchema);

//Export model
module.exports = { UserModel };