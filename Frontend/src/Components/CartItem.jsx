import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem, deleteCartItemDB, updateCartItemDB, calculateTotalQuantity } from "../utils/cartSlice";

function CartItem({cartItemData}){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //redirecting user to product details page after clicking on cart item image
    function handleNavigateProductDetailPage(){
         navigate(`/productdetail/${cartItemData.id}`)
    }

    function handleIncreaseQuantity(){
        dispatch(increaseQuantity(cartItemData));

        //updating quantity on backend DB
        dispatch(updateCartItemDB({id: cartItemData.id, quantity: cartItemData.quantity + 1}))
    }

    function handleDecreaseQuantity(){
        dispatch(decreaseQuantity(cartItemData));

        //updating quantity on backend DB
        dispatch(updateCartItemDB({id: cartItemData.id, quantity: cartItemData.quantity - 1}))
    }

    function handleRemoveItem(){
        dispatch(removeItem(cartItemData));

        //delete item from DB
        dispatch(deleteCartItemDB(cartItemData.id));

        //calcualte the total quantity in cart slice after cart item being removed
        dispatch(calculateTotalQuantity());
    }
    
    return (
        <div className="cartItem_component">
            <div onClick={handleNavigateProductDetailPage} className="cartItem_image_box">
            <img src={cartItemData.images[0]} alt="cart image" />
            </div>
            <div className="cartItem_details_and_buttons_box">
                <div className="cartItem_details">
                    <p className="cartItem_title">{cartItemData.title}</p>
                    <p className="cartItem_price">$ {cartItemData.price}</p>
                    <p className="cartItem_shipping">{cartItemData.shippingInformation}</p>
                    <p className="cartItem_returnPolicy">{cartItemData.returnPolicy}</p>
                </div>
                <div className="cartItem_buttons">
                    <div className="quantity_buttons">
                        <button style={cartItemData.quantity <= 1 ? {cursor: 'not-allowed'} : {}} disabled={cartItemData.quantity <= 1} onClick={handleDecreaseQuantity} className="decrease_quantity_btn">-</button>
                        <div className="quantity_details_box">{cartItemData.quantity}</div>
                        <button onClick={handleIncreaseQuantity} className="increase_quantity_btn">+</button>
                    </div>
                    <div className="remove_button">
                        <button onClick={handleRemoveItem} className="remove_cartItem_btn">REMOVE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;