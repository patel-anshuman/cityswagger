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

//Get user details
userRouter.get('/details', async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if(token) {
      try {
        const decoded = jwt.verify(token, process.env.key);
        if(decoded) {
          const { userID } = decoded;
          const user = await UserModel.findOne({ _id: userID }).exec();
          if(user) {
            res.status(200).send(user);
          } else {
            res.status(400).send({ msg: "User not found" });
          }
        } else {
          res.status(400).send({ msg: "Invalid Token !!" });
        }
      } catch (err) {
        res.status(400).send({ msg: err.message });
      }
    } else {
      res.status(400).send({ msg: "Authentication failed" });
    }
  });
  

//Export router
module.exports = userRouter;