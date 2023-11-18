const {Router} = require('express');
const {ProductModel} = require('../models/product.model');
const {auth} = require('../middlewares/auth.middleware'); //To add, update & delete
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const productRouter = Router();

//Get all shirts
productRouter.get('/shirts', async (req,res) => {
    const {page, limit} = req.query;
    const skip = (page-1)*limit;
    try {
        const totalProductsCount = await ProductModel.countDocuments();
        let data = await ProductModel.find().skip(skip).limit(limit);
        res.status(200).send({
            "X-Total-Count": totalProductsCount,
            "data": data
        });
    } catch (err) {
        res.status(400).send({"msg": err.message});
    }
});

//Get one product -> for individual product page
productRouter.get('/shirts/:id', async (req,res) => {
    const {id} = req.params;
    try {
        let data = await ProductModel.findOne({_id:id});
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