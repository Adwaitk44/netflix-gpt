import React from 'react';

const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-black-200 z-10 bg-opacity-75">
      <img
        className="w-44 opacity-100" // Adjust the opacity value as needed
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
    </div>
  );
};

export default Header;
