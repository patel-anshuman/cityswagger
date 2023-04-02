const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userID: String,
    products: Array, //[{prod_id: , quantity: }]
    address: String,
    date_of_purchase: String
},{
    versionKey: false
});

const OrderModel = mongoose.model('order',orderSchema);

//Export model
module.exports = { OrderModel };