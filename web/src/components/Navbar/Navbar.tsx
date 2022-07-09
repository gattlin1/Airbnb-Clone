import Link from 'next/link';
import React from 'react';
import UserActions from './UserActions/UserActions';

function Navbar() {
  return (
    <nav className='bg-white shadow-lg relative top-0 flex border-b items-center'>
      <div className='flex-grow ml-4'>
        <Link href='/'>
          <span className='cursor-pointer text-xl'>LandBnB</span>
        </Link>
      </div>
      <UserActions />
    </nav>
  );
}

export default Navbar;
