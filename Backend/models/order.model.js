const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    title: String,
    name : String,
    email : String,
    password : String,
    phone: String
},{
    versionKey: false
});

const OrderModel = mongoose.model('order',orderSchema);

//Export model
module.exports = { OrderModel };