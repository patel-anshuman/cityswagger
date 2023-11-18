const {Router} = require('express');
const {UserModel} = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRouter = Router();

//Register
userRouter.post('/register', async (req, res) => {
  try {
    const { title, name, email, password, phone } = req.body;

    if (!title || !name || !email || !password || !phone) {
      return res.status(400).json({ msg: 'Please provide all required information' });
    }

    const hash = await bcrypt.hash(password, +process.env.SALT_ROUND);

    const user = new UserModel({ title, name, email, password: hash, phone });

    await user.save();

    res.status(200).json({ msg: 'User registration successful' });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

//Login
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ msg: 'Please provide both email and password' });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY);

        return res.status(200).send({
          msg: 'Login Successful',
          token
        });
      } else {
        return res.status(400).send({ msg: 'Wrong credentials' });
      }
    } else {
      return res.status(400).send({ msg: 'No user found. Register first.' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
});

//Get user details - for account dashboard
userRouter.get('/details', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ msg: "Authentication failed. Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    const { userID } = decoded;
    const user = await UserModel.findOne({ _id: userID }).exec();

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error('Error while getting user details:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});
  

//Export router
module.exports = userRouter;