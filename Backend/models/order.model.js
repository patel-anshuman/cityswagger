const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    products: {
        type: [
            {
                prod_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date_of_purchase: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    versionKey: false
});

const OrderModel = mongoose.model('order', orderSchema);

module.exports = OrderModel;
