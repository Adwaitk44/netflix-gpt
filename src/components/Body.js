import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import Error from './Error';

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [dispatch]); // Added dispatch as a dependency

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/" element={<Login />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default Body;
