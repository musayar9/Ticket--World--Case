import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <img src="/concert_logo.png" />
        </div>
        <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
          <ul>
            <li>
              <NavLink to="/city">Şehir Seç</NavLink>
            </li>
            <li>
              <NavLink to="/">Üye Ol</NavLink>
            </li>
            <li>
              <NavLink to="/">Giriş Yap</NavLink>
            </li>
          </ul>
        </div>
        <div className="h-menu">
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu className="h-menu-button" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;