import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { getCartItemsDB} from "../utils/cartSlice";
import { useEffect } from "react";

function Cart(){
    
    const dispatch = useDispatch();

    // getting cart items from cart slice
    const cartItems = useSelector(store => store.cart.items);
    
    //getting totalQuanity from the cart slice
    const totalItems = useSelector(store => store.cart.totalQuantity);

    const error = useSelector(store => store.cart.error);

    const totalPrice = cartItems.reduce((acc, cur) => {
          acc = acc + cur.quantity * cur.price;
          return acc;
    }, 0)

    const discount_30_percent = totalPrice * (30/100);

    // total amount = total price - coupons + platform fee + delivery charge
    const totalAmount = totalPrice - discount_30_percent + 5 + 20;

    useEffect(() => {
      dispatch(getCartItemsDB());
    },[dispatch]);

    if(error){
        return (
            <div className="fetch_error_box">
                <p>{error}</p>
            </div>
        )
    }


    return (
        <div className="cart_component">
            {cartItems.length == 0 && <p className="emptyCart_text">Your cart is empty!</p>}
            {cartItems.length > 0 && <div className="cart_container">
                <div className="cart_items_container">
                  {cartItems?.map((item) => {
                     return <CartItem cartItemData={item} key={item.id}/>
                  })}
                    
                </div>
                <div className="checkout_box">
                    <div className="checkout_details">
                        <div className="checkout_price">
                          <p>Price ({totalItems} items)</p>
                          <p>$ {totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="checkout_discount">
                          <p>Discount (30%)</p>
                          <p>- $ {discount_30_percent.toFixed(2)}</p>
                        </div>
                        <div className="checkout_platformFee">
                          <p>Platform fee</p>
                          <p>$ 5.00</p>
                        </div>
                        <div className="checkout_delivery">
                          <p>Delivery charges</p>
                          <p>$ 20.00</p>
                        </div>
                    </div>
                    <div className="checkout_totalAmount">
                      <p>Total Amount</p>
                      <p>$ {totalAmount.toFixed(2)}</p>
                    </div>
                    <button className="checkout_placeOrder_btn">PLACE ORDER</button>
                </div>
            </div>}
        </div>
    )
}

export default Cart;