import { useDispatch, useSelector } from "react-redux";
import { addItem, addCartItemDB, calculateTotalQuantity } from "../utils/cartSlice";

import { useNavigate } from "react-router-dom";

function ProductItem({item}){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.users.isLogin);

    function navigateToProductDetail(){
        navigate(`/productdetail/${item.id}`)
    }

    function handleAddToCart(e){
        // pressing add to cart button should not direct us to product detail page
       e.stopPropagation();
       if(isUserLoggedIn){
        //dispatching action to add the item to cart slice and updating the cart icon
        dispatch(addItem(item));

        //adding item to database
        dispatch(addCartItemDB(item));
        
        //calcualting the toal quantity in cart slice after item added to cart
        dispatch(calculateTotalQuantity());
       }else{
        alert("Login first to add item to cart!!")
       }
    }

    return (
        <div onClick={navigateToProductDetail} className="productItem_component">
            <img src={item?.images[0]} alt="item image" />
            <p>{item?.title}</p>
            <p className='item_price'>$ {item?.price}</p>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
    )
}

export default ProductItem;