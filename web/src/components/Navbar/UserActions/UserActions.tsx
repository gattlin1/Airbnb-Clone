import Link from 'next/link';
import React, { useState } from 'react';

function UserActions() {
  const [optionsOpen, toggleOptionsOpen] = useState(false);
  const userOptionsClasses = ['user-options'];

  if (optionsOpen) {
    userOptionsClasses.push('open');
  }

  const handleOptions = () => {
    toggleOptionsOpen(!optionsOpen);
  };

  return (
    <>
      <div className='mr-4'>
        <button
          className='flex items-center space-x-3 text-black bg-slate-200 rounded-md p-2'
          onClick={() => handleOptions()}
        >
          <i className='fa-solid fa-user'></i>
          <i className='fa-solid fa-chevron-down'></i>
        </button>
      </div>
      <div
        className={`absolute top-20 right-4 border-solid border rounded-md shadow-md border-slate-100 w-64 ${
          !optionsOpen ? 'hidden' : ''
        }`}
      >
        <ul className='text-black font-light text-sm'>
          <Link href='/signup'>
            <li className='hover:bg-gray-100 mt-2 pl-4'>Sign Up</li>
          </Link>
          <Link href='/login'>
            <li className='hover:bg-gray-100 pl-4'>Login</li>
          </Link>
          <Link href='/createListing'>
            <li className='hover:bg-gray-100 mb-2 pl-4'>Create a Listing</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default UserActions;
