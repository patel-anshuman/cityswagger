const {Router} = require('express');
const {OrderModel} = require('../models/order.model');
const {auth} = require('../middlewares/auth.middleware');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const orderRouter = Router();



//Export router
module.exports = orderRouter;