const {Router} = require('express');
const {UserModel} = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRouter = Router();

//Register
userRouter.post('/register', async (req,res) => {
    const {title, name, email, password, phone} = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({title, name, email, password:hash, phone});
            await user.save();
            res.status(200).send({"msg": "User registration successful"});
        })
    } catch (err) {
        res.status(400).send({"msg": err.message});
    }
});

//Login
userRouter.post('/login', async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        // console.log(user)
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    res.status(200).send({
                        "msg": "Login Successful",
                        "token": jwt.sign({ "userID": user._id }, process.env.key)
                    });
                } else {
                    res.status(400).send({"msg":`Wrong credentials: ${err.message}`});
                }
            });
        } else {
            res.status(400).send({"msg":"No user found!! Register first"});
        }
    } catch (err) {
        res.status(400).send({"msg":err.message});
    }
});

//Export router
module.exports = userRouter;