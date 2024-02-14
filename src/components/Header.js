import React, { useEffect } from 'react';
import {auth} from "../utils/firebase";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES, USER_LOGO } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
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

  const handleGPTSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-black  z-10  flex justify-between items-center">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />
      {
        user && (
          <div className="flex items-center">

            {showGptSearch && (
            <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
              {
                SUPPORTED_LANGUAGES.map((lang)=> <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
              }
            </select>
            )}

            <button className='py-2 px-4 mx-2 my-2 bg-purple-800 text-white rounded-lg'
            onClick={handleGPTSearchClick}>Try Gpt</button>
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
