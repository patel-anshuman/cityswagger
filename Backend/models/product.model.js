const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    name : String,
    email : String,
    password : String,
    phone: String
},{
    versionKey: false
});

const ProductModel = mongoose.model('product',productSchema);

//Export model
module.exports = { ProductModel };