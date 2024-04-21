import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import menuLogo from '../imgs/menu-logo.png';
import './nav.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        {/* <ul className="nav navbar-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/contactform">ContactUs</a></li>
          <li><a href="/adminLogin">Admin Login</a></li>
          <li className="dropdown">
            <a href="/Stafflogin">Staff Login</a>
          </li>
          <li><a href="/login">Login</a></li>
        </ul> */}
        <Menu right isOpen={menuOpen} onStateChange={handleStateChange}>
          <a id='a' href="/" onClick={closeMenu}>Home</a>
          <a href="/contactform" onClick={closeMenu}>ContactUs</a>
          <a href="/adminLogin" onClick={closeMenu}>Admin Login</a>
          <a href="/Stafflogin" onClick={closeMenu}>Staff Login</a>
          <a href="/login" onClick={closeMenu}>Login</a>
        </Menu>
        <ul className="nav navbar-nav navbar-right">
          <a href="#" onClick={toggleMenu}><img src={menuLogo} alt="Menu Logo" /></a>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
