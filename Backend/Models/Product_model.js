import mongoose from 'mongoose';

// creating product schema
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        default: ['https://akashBansal.com/defaultImage']
    },
    rating : Number,
    returnPolicy: String,
    warrantyInformation: String,
    shippingInformation: {
        type: String,
        required: true
    },
    availabilityStatus: {
        type: String,
        required: true
    },
});

// creating product model
const ProductModel = mongoose.model('products', productSchema);

export default ProductModel;