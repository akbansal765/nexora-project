import { Link, useNavigate } from "react-router-dom";
import cart from '../assets/cart.png'
import nexora from '../assets/nexora_logo.png'
import {useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { useState } from "react";
import { logoutUser } from "../utils/userSlice";
import { getCartItemsDB } from "../utils/cartSlice";


function Header(){
    const dispatch = useDispatch();

    //implementing sign in states
    const [isSignIn, setSignIn] = useState(false);
  
    function handleSignIn(){
        setSignIn(!isSignIn);
    }

    const totalCartItems = useSelector(store => store.cart.totalQuantity);
    const isUserLoggedIn = useSelector(state => state.users.isLogin);

    const navigate = useNavigate();

    // handling cart icon
    function handleOpenCart(){
        if(isUserLoggedIn){
            navigate('/cart');
        }else{
            alert("Kindly Login First to open the cart!!")
        }
    }

    function handleLogout(){
        dispatch(logoutUser());
        dispatch(getCartItemsDB());
    }

    return (
        <>
        <div className="header_component">
            <div className="headline_box">
                <p>SIMPLE SHOPPING, GLOBAL SELECTION, ONE PLACE.</p>
            </div>
            <div className="navbar">
                <div className="logo_box">
                    <img src={nexora} alt="logo" />
                </div>
                <div className="nav_links">
                    <Link to='/' style={{textDecoration: 'none', outline: 'none'}}><li>HOME</li></Link>
                    {!isUserLoggedIn && <Link to='/' style={{textDecoration: 'none', outline: 'none'}}><li onClick={handleSignIn}>SIGN IN</li></Link>}
                    {isUserLoggedIn && <Link to='/' style={{textDecoration: 'none', outline: 'none'}}><li onClick={handleLogout}>LOGOUT</li></Link>}
                    <li className="cart_button_li">
                        <div onClick={handleOpenCart} className="cart_button_box">
                            <img src={cart} alt="cart icon" />
                            <div className="cart_items_box">
                                <p>{totalCartItems}</p>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
        {isSignIn ? <Modal setSignIn={setSignIn}/> : ''}
        </>
    )
}

export default Header;