import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';


const Body = () => {
    return (
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/" element={<Login />} /> 
          
        </Routes>
      </Router>
    );
  };
export default Body
