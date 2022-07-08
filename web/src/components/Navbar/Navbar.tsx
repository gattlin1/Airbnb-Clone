import Link from 'next/link';
import React from 'react';
import UserActions from './UserActions/UserActions';

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='title-container'>
        <Link href='/'>
          <span id='title'>LandBnB</span>
        </Link>
      </div>
      <UserActions />
    </nav>
  );
}

export default Navbar;
