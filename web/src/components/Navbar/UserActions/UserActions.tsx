import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useLogoutMutation, useMeQuery } from '../../../generated/graphql';
import { withApollo } from '../../../utils/withApollo';

type UserOptions = { path: string; label: string; show: boolean };

function UserActions() {
  const [optionsOpen, toggleOptionsOpen] = useState(false);
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  let userOptions = null;
  if (data?.me) {
    userOptions = (
      <ul className='text-black font-light text-sm'>
        <Link href='/profile'>
          <li className='hover:bg-gray-100 mt-2 pl-4 h-8 flex items-center'>
            Profile
          </li>
        </Link>
        <li
          className='hover:bg-gray-100 mb-2 pl-4 h-8 flex items-center'
          onClick={async () => {
            await logout();
            apolloClient.resetStore();
          }}
        >
          Logout
        </li>
        <hr />
        <Link href='/createListing'>
          <li className='hover:bg-gray-100 mt-2 mb-2 pl-4 h-8 flex items-center'>
            Create Listing
          </li>
        </Link>
      </ul>
    );
  } else {
    userOptions = (
      <ul className='text-black font-light text-sm'>
        <Link href='/signup'>
          <li className='hover:bg-gray-100 mt-2 pl-4 h-8 flex items-center'>
            Sign Up
          </li>
        </Link>
        <Link href='/login'>
          <li className='hover:bg-gray-100 mb-2 pl-4 h-8 flex items-center'>
            Login
          </li>
        </Link>
      </ul>
    );
  }

  const handleOptions = () => {
    toggleOptionsOpen(!optionsOpen);
  };

  return (
    <>
      <div className='mr-4'>
        <button
          className='flex items-center space-x-3 text-black bg-slate-200 rounded-md p-2'
          onClick={handleOptions}
        >
          <i className='fa-solid fa-user'></i>
          <i className='fa-solid fa-chevron-down'></i>
        </button>
      </div>
      <div
        className={`absolute top-20 right-4 border-solid border rounded-md shadow-md border-slate-100 w-64 bg-white ${
          !optionsOpen ? 'hidden' : ''
        }`}
        onClick={handleOptions}
      >
        {userOptions}
      </div>
    </>
  );
}

export default withApollo({ ssr: true })(UserActions);
