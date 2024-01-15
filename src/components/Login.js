import React, { useRef, useState } from 'react'
import Header from "./Header";
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const[isSignInForm,setIsSignInForm]=useState(true);
  const[errorMessage,setErrorMessage]=useState(null);

  const navigate=useNavigate();
  const dispatch=useDispatch();


  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick=()=>{
    //console.log(email);
     const message=checkValidData(email.current.value,password.current.value);
     
     setErrorMessage(message);
      if(message)return;

      if(!isSignInForm){

        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value , photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            const { uid, email, displayName, photoURL } =auth.currentUser ;
            dispatch(addUser({ uid, email, displayName, photoURL }));
            // Profile updated!
            navigate("/browse");
          }).catch((error) => {
            // An error occurred
             setErrorMessage(error.message);
          });
          //console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+ errorMessage)
        });
      }
      else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate("/browse");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+"-"+ errorMessage);
          });
      }
  };

  return (
    <div>
    <Header/>
    <div className="absolute">
    <img 
     src="https://assets.nflxext.com/ffe/siteui/vlv3/594f8025-139a-4a35-b58d-4ecf8fdc507c/d3c4e455-f0bf-4003-b7cd-511dda6da82a/IN-en-20240108-popsignuptwoweeks-perspective_alpha_website_large.jpg"
     alt="logo"
     />
    </div>
    <form onSubmit={(e)=>e.preventDefault()}className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
      <h1 className='font-bold text-3xl py-4'>{isSignInForm? "Sign In" :"Sign Up"}</h1>
      {
        !isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-800"/>
      }

      <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-800"/>

      <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full   bg-gray-800"/>

      <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

      <button className="p-4 my-6 bg-red-700 w-full rounded-lg " onClick={handleButtonClick}>{isSignInForm? "Sign In" :"Sign Up"}</button>
      <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm?"New to Netflix Sign Up":" Already registered? Sign In"} </p>
    </form>
    </div>
  )
}

export default Login
