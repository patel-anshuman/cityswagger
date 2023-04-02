const express = require('express');
const userRoute = require('../routes/user.route');
const postRoute = require('../routes/product.route');
const orderRoute = require('../routes/order.route');
const {auth} = require('../middlewares/auth.middleware');
const { connection } = require('../database/db');
const port = process.env.PORT;
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/users',userRoute);
app.use('/products',postRoute);
app.use('/orders',orderRoute);

app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to Mongo DB Atlas");
    } catch (err) {
        console.log("Couldn't connect to Database");
    }
    console.log(`Server is running at port ${port}`);
})

module.exports = app;