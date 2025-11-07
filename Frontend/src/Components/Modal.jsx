import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser, loginUser } from "../utils/userSlice";
import { getCartItemsDB } from "../utils/cartSlice";

function Modal({ setSignIn }) {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector(state => state.users.isLogin);
  const isUserRegisteredToDB = useSelector(state => state.users.isUserRegistered);

  const [isLogin, setLogin] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
      e.preventDefault();

      const user = { email, password };

      // Dispatch and wait for result
      const resultAction = await dispatch(loginUser(user));
      console.log(resultAction)
      console.log(loginUser.rejected.match(resultAction))

      if (loginUser.rejected.match(resultAction)) {
        // If the login was rejected, show an alert
        alert(resultAction.payload || "Login failed!");
      }
  }

  function handleRegister(e){
    e.preventDefault();
    
    const newUser = {firstName, lastName, email, password};
    dispatch(registerUser(newUser));
  }

  useEffect(() => {
    if(isUserLoggedIn){
       setSignIn(false);
       dispatch(getCartItemsDB());
    }
  }, [isUserLoggedIn])

  useEffect(() => {
    if(isUserRegisteredToDB){
       alert("Kindly Login to Access the platform!!")
       setLogin(true);
       setFirstName("")
       setLastName("")
       setEmail("")
       setPassword("");
    }
  }, [isUserRegisteredToDB]);


  return (
    <form onSubmit={!isLogin ? handleRegister : handleLogin}>
    <div className="modal_overlay" onClick={() => setSignIn(false)}>
      <div className="modal_component" onClick={(e) => e.stopPropagation()}>
        <button className="custom_close_btn" onClick={() => setSignIn(false)}>
          <span className="line line1"></span>
          <span className="line line2"></span>
        </button>

        {!isLogin && <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required/>}
        {!isLogin && <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name"/>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" required/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>

        {!isLogin && <button className="action_btn">Register</button>}

        {isLogin && (
          <div className="btn_group">
            <button className="action_btn">Log in</button>
            <button className="link_btn" onClick={() => setLogin(false)}>Sign up</button>
          </div>
        )}

        {!isLogin && (
          <div className="login_redirect">
            <p>Already have an account?</p>
            <Link to="/" onClick={() => setLogin(true)}>Log in</Link>
          </div>
        )}
      </div>
    </div>
    </form>
  );
}

export default Modal;

















// import { useState } from "react";
// import { Link } from "react-router-dom";

// function Modal({setSignIn}){

//     const [isLogin, setLogin] = useState(false);

//     function handleLogin(){
//         setLogin(true);
//     }


//     return (
//         <div className="modal_component">
//             {!isLogin ? <input type="text" placeholder="Full Name"/> : ''}
//             <input type="text" placeholder="Email Address"/>
//             <input type="text" placeholder="Password"/>
//             {!isLogin ? <button>Register</button> : ''}
//             {isLogin ? <div>
//                 <button>Log in</button>
//                 <button onClick={() => setLogin(false)}>Sign up</button>
//             </div> : ''}
//             {!isLogin ? <div>
//                 <p>Already have an account:- </p>
//                 <Link to="/" onClick={handleLogin}>Log in</Link>
//             </div> : ''}
//             <button className="closeModal_btn" onClick={() => setSignIn(false)}>❌</button>
//         </div>
//     )
// }

// export default Modal;