import React, { useState, useEffect } from "react";
import LanguageIcon from "@material-ui/icons/Language";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import "../../StyleSheet/DesktopNav.css";

//=======================================================DESKTOP NAVBAR===================================================
const DesktopNav = () => {
  const [isScrolling, setScrolling] = useState(false);
  const top = 0;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scroll = window.pageYOffset || document.documentElement.scrollTop;

      if (scroll > top) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    });
  });
  return (
    <div className="DesktopNav__container">
      {isScrolling ? null : (
        <div className="DesktopTopNav__container">
          <div className="left__container">
            <div className="left__icon">
              <LanguageIcon />
            </div>
            <div className="location">
              <h4>English / South Africa</h4>
            </div>
          </div>
          <div className="right__container">
            <div className="right__icon">
              <HelpOutlineIcon />
            </div>
            <div className="customer__care">
              <Link
                to="/customer-care"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4>Customer Care</h4>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="DesktopBottomNav__container">
        <div className="Right__leftContainier">
          <div className="Company__name">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "black" }}
              className="Company__name"
            >
              <h2>Hlongwane Botique</h2>
            </Link>
          </div>
          <div className="Nav__links">
            <div className="link">
              <Link
                to="/clothes/hoodies"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4>Hoodies</h4>
              </Link>
            </div>
            <div className="link">
              <Link
                to="/clothes/jackets"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4>Jackets</h4>
              </Link>
            </div>
            <div className="link">
              <Link
                to="/clothes/t-shirts"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4>T-Shirts</h4>
              </Link>
            </div>
          </div>
        </div>
        <div className="Right__rightContainer">
          <div className="Search__icon">
            <SearchIcon className="searchIcon" />
          </div>
          <div className="Cart__container">
            <div className="user">
              <Link
                to="/user-auth/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <PersonIcon />
              </Link>
            </div>
            <div className="wish__list">
              <FavoriteBorderIcon />
            </div>
            <div className="cart">
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ShoppingCartIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
