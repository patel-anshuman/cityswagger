const {Router} = require('express');
const {OrderModel} = require('../models/order.model');
const {auth} = require('../middlewares/auth.middleware');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const orderRouter = Router();

//Post products by user
orderRouter.post('/',auth, async (req,res) => {
    const payload = req.body;
    try {
        const data = new OrderModel(payload);
        await data.save();
        res.status(200).send({msg:"New order added"});
    } catch (err) {
        res.status(400).send({"msg": err.message});
    }
})

//Get order list of particular user only
orderRouter.get('/', async (req,res) => {
    const token = req.headers.authorization.split(" ")[1];
    if(token){
        const decoded = jwt.verify(token, process.env.key);
        if(decoded){
            const orderData = await OrderModel.find({userID:decoded.userID}).sort({date_of_purchase: -1});
            res.status(200).send(orderData);
        } else {
            res.status(400).send({"msg": "Invalid Token !!"});
        }
    } else {
        res.status(400).send({"msg": "Authentication failed"});
    }
})

//Export router
module.exports = orderRouter;