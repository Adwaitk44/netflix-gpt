import React, { useEffect } from 'react';
import {auth} from "../utils/firebase";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_LOGO } from '../utils/constant';

const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(store=>store.user);
  //console.log(user);

  const HandleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      //console.log(user);
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(() => {
     const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({uid, email, displayName, photoURL }));
        navigate("/browse");
      } 
      else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe called when componenet unmounts
    return()=>unsubscribe();
  },[]);

  return (
    <div className="absolute w-screen px-8 py-2 bg-black z-10 bg-opacity-75 flex justify-between items-center">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />
      {
        user && (
          <div className="flex items-center">
          <img
            className="w-16 h-16 p-4"
            alt="usericon"
            src={USER_LOGO}
           
          />
          <button onClick={HandleSignOut} className="ml-2 font-bold text-white text-lg">SignOut</button>

          {user.displayName && (
             <span className="ml-2 text-white text-sm font-semibold">(Welcome, {user.displayName})</span>
          )}
          
        </div>
        )
      }
     
    </div>
  );
};

export default Header;
