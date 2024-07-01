import React, { useState } from "react";
import "./../styles/Navbar.css";
import Logo_comp from "./../../src/assests/images/LS logo1.png";
import Logo_comp1 from "./../../src/assests/images/LinksUs Text.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar2">
        <div className="nav-section">
          <div className="nav-section1">
            <a href="">About</a>
            <a href="">Use Cases</a>
            <a href="">Tools</a>
            <a href="">Blogs</a>
          </div>
          <div className="nav-section2">
            <a href="https://linksus.in/" className="link-to-main">
              <img src={Logo_comp} alt="" className="logo-img" />
              <img src={Logo_comp1} alt="" className="logo-text" />
            </a>
          </div>
        </div>
        <button className="get-linksus">Get LinksUs</button>
        <div className="hamburger" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#545454" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className={`nav-section1-mobile ${isOpen ? 'open' : 'close'}`}>
          <a href="">About</a>
          <a href="">Use Cases</a>
          <a href="">Tools</a>
          <a href="">Blogs</a>
        </div>
      )}
    </>
  );
};

export default Navbar;
