import React, { useState, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { MdShoppingCart } from "react-icons/md";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [concertTitles, setConcertTitles] = useState([]);
  const navigate = useNavigate();

  const handleShoppingCartClick = () => {
    navigate("/city");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/activity");
        const data = response.data;
        const titles = data.map((i) => i.title);
        setConcertTitles(titles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);


  const handleAutocompleteChange = (event, value) => {
    if (value) {
      navigate("/city");
    }
  };

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <img src="/concert_logo.png" alt="Logo"/>
        </div>
        <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={concertTitles}
          onChange={handleAutocompleteChange}
          getOptionLabel={(option) => option}
          sx={{
            width: 300,
            '.MuiOutlinedInput-root': {
              backgroundColor: 'white',
              '&:hover': {
                '& fieldset': {
                  borderColor: 'white',
                },
              },
              '&.Mui-focused': {
                '& fieldset': {
                  borderColor: 'white',
                },
              },
            },
            '.MuiInputBase-input': {
              color: 'black',
            },
          }}
          renderInput={(params) => 
          <TextField 
          {...params} 
          label="Company Name" 
          />}
        />

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
          <div 
        className="shopping-cart-icon" 
        onClick={handleShoppingCartClick}
        >
          <MdShoppingCart  style={{ fontSize: "3rem", color: "white" }} />
      </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;