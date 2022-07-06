import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
