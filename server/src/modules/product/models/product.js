const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}); 

const offerSchema = new mongoose.Schema({

    offer: {
        type: String,
        required: true,
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "Product",
    },
}); 

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },

});


const Product = mongoose.model('Product', productSchema);
const Offer = mongoose.model('Offer', offerSchema);
const Cart = mongoose.model('Cart', cartSchema);

module.exports = {Product, Offer, Cart};