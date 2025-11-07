import mongoose from "mongoose";

// creating schema for cart item
const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1 // setting 1 as a default quanity when new cart item will be added
    },
    images: {
        type: Array,
        default: ['https://akashBansal.com/defaultImage']
    },
    shippingInformation: {
        type: String,
        required: true
    },
    returnPolicy: {
        type: String,
        required: true
    },
})

// creating model of cart item
const CartModel = mongoose.model('cartItems', cartSchema);

export default CartModel;