import UserModel from "../Models/User_model.js";

// callback function to fetch all the cart items in the cart
export async function getAllCartItems(req, res){
    try{
        //finding the cart items in user schemea using email
        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found!!"})
        }
        const cartItems = user.cartItems;
        //if the array is empty show empty database error
        if(cartItems.length > 0){
          return res.status(200).json(cartItems);
        }else{
            return res.status(404).json({message: 'Empty Cart!!!'})
        }
    }catch(err){
        return res.status(500).json({
            message: 'Unable to fetch cart items, kindly try again later!',
            error: err.message
        })
    }
}

// callback function to add a new item to cart
export async function createCartItem(req, res){
    try{
        //finding the cart item in user schemea using email
        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found!!"})
        }
        //getting the values from request by destructuring
        const {id, title, price, quantity, images, shippingInformation, returnPolicy} = req.body;

        // if product already exists in cart items database then only increase the quantity otherwise add the product
        const alreadyExisingCartItem = user.cartItems.find(item => item.id == id);
        if(alreadyExisingCartItem){
             alreadyExisingCartItem.quantity += 1;
             await user.save();
          
            return res.status(200).json({
                message: 'Quanity increased by one',
                updatedItem : alreadyExisingCartItem
            })
        }else{
            // creating cart item
            const cartItem = {id, title, price, quantity, images, shippingInformation, returnPolicy};
            user.cartItems.push(cartItem);
            await user.save();

            return res.status(200).json({
                message: 'Cart item has been added to Database!',
                user: cartItem
        });
        }
    }catch(err){
        return res.status(500).json({
            message: 'Unable to add the item to cart, kindly try again later!',
            error: err.message
        })
    }
};

// callback function to update the quantity of the cart item
export async function updateCartItem(req, res){
    try{
        // getting quanity from request
        const {quantity} = req.body;

        // checking edge cases on quanity
        if (typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found!!"})
        }
        // updating the quanity property only
        // const cartItem = await CartModel.findOneAndUpdate({id: req.params.id}, {quantity}, {new: true})
        const cartItem = user.cartItems.find(item => item.id == req.params.id);
        
        if(cartItem){
            cartItem.quantity = quantity;
            await user.save();

            return res.status(200).json({
                message: 'Quanity has been updated',
                updatedItem: cartItem
            })
        }else{
            return res.status(404).json({message: 'Item not found!!'})
        }
    }catch(err){
        return res.status(500).json({
            message: 'Unable to update the cart item! Try again later!',
            error: err.message
        })
    }
};

// callback function to delete the cart item
export async function deleteCartItem(req, res){
    try{
        //getting the id from the request
        const cartItemId = req.params.id;
        //finding the cart items in user schemea using email
        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found!!"})
        }
        //deleting the cart item from the database with matching id
        const cartItems = user.cartItems;
        const index = cartItems.findIndex(item => item.id == cartItemId);
        if(index === -1){
            return res.status(404).json({message: "Item not found!"})
        }
        const deletedItem = cartItems[index];
        cartItems.splice(index, 1);

        await user.save();

        return res.status(200).json({
                message: 'Cart item has been deleted.',
                deletedItem
        });

    }catch(err){
        return res.status(500).json({
            message: 'Unable to delete the cart item, kindly try again later!',
            error: err.message
        })
    }
};