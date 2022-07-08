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
      <div className='user-actions'>
        <button className='user-options-button' onClick={() => handleOptions()}>
          <div className='user-logo'>
            <i className='fa-solid fa-user'></i>
          </div>
          <i className='fa-solid fa-chevron-down'></i>
        </button>
      </div>
      <div className={userOptionsClasses.join(' ')}>
        <ul>
          <Link href='/signup'>
            <li>Sign Up</li>
          </Link>
          <Link href='/login'>
            <li>Login</li>
          </Link>
          <Link href='create listing'>
            <li>Create a Listing</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default UserActions;
