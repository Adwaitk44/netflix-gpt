import React from 'react';
import {auth} from "../utils/firebase";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  console.log(user);

  const HandleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log(user);
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-black z-10 bg-opacity-75 flex justify-between items-center">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {
        user && (
          <div className="flex items-center">
          <img
            className="w-16 h-16 p-4" // Adjust the size as needed
            alt="usericon"
            src="https://occ-0-4608-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
           
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
