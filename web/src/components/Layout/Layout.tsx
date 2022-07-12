import React from 'react';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className='h-screen p-2'>{children}</main>
    </>
  );
}

export default Layout;
