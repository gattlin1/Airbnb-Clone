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
          <i className='fa-regular fa-user'></i>
          <i className='fa-solid fa-chevron-down'></i>
        </button>
      </div>
      <div className={userOptionsClasses.join(' ')}>
        <ul>
          <li>Sign Up</li>
          <li>Login</li>
          <li>Create a Listing</li>
        </ul>
      </div>
    </>
  );
}

export default UserActions;
