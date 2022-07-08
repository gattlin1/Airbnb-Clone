import React from 'react';
import UserActions from './UserActions/UserActions';

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='title-container'>
        <span id='title'>LandBnB</span>
      </div>
      <UserActions />
    </nav>
  );
}

export default Navbar;
