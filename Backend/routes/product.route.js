const {Router} = require('express');
const {ProductModel} = require('../models/product.model');
const {auth} = require('../middlewares/auth.middleware'); //To add, update & delete
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const productRouter = Router();

//Get product
productRouter.get('/shirts', async (req,res) => {
    const {page, limit} = req.query;
    const skip = (page-1)*limit;
    try {
        const totalProductsCount = await ProductModel.countDocuments();
        let data = await ProductModel.find().skip(skip).limit(limit);
        res.set('X-Total-Count', totalProductsCount);
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send({"msg": err.message});
    }
});

//Add product
productRouter.post('/', async (req,res) => {
    const {email, password} = req.body;
    try {
        
    } catch (err) {
        res.status(400).send({"msg":err.message});
    }
});

//Export router
module.exports = productRouter;