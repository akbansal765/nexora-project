import {getAllProducts, getProductById, addProductsToProductList} from "../controllers/product_controllers.js"
import {getAllCartItems, createCartItem, deleteCartItem, updateCartItem} from "../controllers/cart_controllers.js"
import { loginUser, registerUser } from "../controllers/user_controllers.js"
import verifyToken from "../middlewares/verifyToken.js"


// creating routes for products
export function productRoutes(app){
    app.get('/products', getAllProducts) // api used to fetch all the products in product list
    app.get('/product/:id', getProductById) // api used to fetch the specific product on product details page
    app.post('/products', addProductsToProductList) // api used to add the dummyData api to products collecion in DB
}

// creating routes for cart items
export function cartRoutes(app){
    // protecting the cartItems routes by adding a verifyToken middleware
    app.get('/cartItems', verifyToken, getAllCartItems) // api used to fetch all the cart items in the cart
    app.post('/cart', createCartItem) // api used to add the item in the cart
    app.put('/cart/:id', updateCartItem) // api used to update the quantity of cart item
    app.delete('/cart/:id', deleteCartItem) // api used to delte the cart item
}

// creating user register and login routes
export function userRoutes(app){
    app.post('/register', registerUser); // api used to register the user in database
    app.post('/login', loginUser); // api used to login the user
}