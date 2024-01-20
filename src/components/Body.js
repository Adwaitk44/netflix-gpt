import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';




import Error from './Error';

const Body = () => {
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
