import ProductModel from "../Models/Product_model.js";
import dummyData from "../dummyData.js";

// callback function for the route '/products' to fetch all the products
export async function getAllProducts(req, res){
    try{
        //using find method on Model to fetch all the products
        const productList = await ProductModel.find();
        //if the array is empty show empty database error
        if(productList.length > 0){
          return res.status(200).json(productList);
        }else{
            return res.status(404).json({message: 'Empty Collection!!!'})
        }
    }catch(err){
        return res.status(500).json({
            message: 'Unable to fetch products, kindly try again later!',
            error: err.message
        })
    }
}

// callback function for the route '/products/:id' to fetch the product by its ID
export function getProductById(req, res){
    try{
        //getting the id from the request
        const productID = req.params.id;
        //finding the product by their id property
        ProductModel.findOne({id : productID})
        .then(product => {
            return res.status(200).json(product);
        }).catch(() => {
           return res.status(404).json({
                message: 'Product does not exist, kindly try with correct ID!',
            })
        })
    }catch(err){
        return res.status(500).json({
            message: 'Unable to fetch the product, kindly try again later!',
            error: err.message
        })
    }
}

// callback function for the route /products to add all the products to DB
export async function addProductsToProductList(req, res){
    try{
        const dummyProductList = await ProductModel.insertMany(dummyData);
        
        if(dummyProductList.length > 0){
            return res.status(200).json(dummyProductList);
        }else{
            return res.status(404).json({message: 'List empty'})
        }
    }catch(err){
        return res.status(500).json({
            message: 'Unable to fetch the products, kindly try again later!',
            error: err.message
        })
    }
}