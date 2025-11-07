import mongoose from "mongoose";

//cart schema
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
});


// creating user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName : String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartItems: {
        type: [cartSchema],
        default: []
    }
});

// creating user model
const UserModel = mongoose.model('users', userSchema);

export default UserModel;