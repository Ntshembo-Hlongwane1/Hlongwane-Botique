import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RoomIcon from "@material-ui/icons/Room";
import CallIcon from "@material-ui/icons/Call";
import LanguageIcon from "@material-ui/icons/Language";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import "../../StyleSheet/MobileNav.css";
// =========================================================MOBILE NAVBAR================================================
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="MobileNav__container">
      {isOpen ? null : (
        <div className="Nav__container">
          <div className="Navleft__container">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <h2>Hlongwane Botique</h2>
            </Link>
          </div>
          <div className="Navright__container">
            <PersonIcon className="mobile__link" />
            <ShoppingCartIcon className="mobile__link" />
            <MenuIcon className="mobile__link" onClick={openMenu} />
          </div>
        </div>
      )}
      {isOpen ? (
        <div className="Mobile__menu">
          <div className="Mobile__menuTop">
            <div className="Brand__nCloseButton">
              <Link path="/" style={{ textDecoration: "none", color: "black" }}>
                <h2>Hlongwane Botique</h2>
              </Link>
              <div className="Closing__button">
                <CloseIcon onClick={openMenu} />
              </div>
            </div>
            <div className="SearchBar">
              <input type="text" placeholder="Search" />
              <SearchIcon />
            </div>
          </div>
          <div className="Mobile__menuCenter">
            <div className="Clothes">
              <Link
                to="/clothes/hoodies"
                style={{ textDecoration: "none", color: "black" }}
                onClick={openMenu}
              >
                <h4>Hoodie</h4>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/clothes/hoodies"
                onClick={openMenu}
              >
                <ChevronRightIcon className="clothes__arrowIcon" />
              </Link>
            </div>
            <div className="Clothes">
              <Link
                to="/clothes/jackets"
                style={{ textDecoration: "none", color: "black" }}
                onClick={openMenu}
              >
                <h4>Jackets</h4>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/clothes/jackets"
                onClick={openMenu}
              >
                <ChevronRightIcon className="clothes__arrowIcon" />
              </Link>
            </div>
            <div className="Clothes">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/clothes/t-shirts"
                onClick={openMenu}
              >
                <h4>T-Shirts</h4>
              </Link>
              <Link style={{ textDecoration: "none", color: "black" }}>
                <ChevronRightIcon
                  className="clothes__arrowIcon"
                  to="/clothes/t-shirts"
                  onClick={openMenu}
                />
              </Link>
            </div>
          </div>
          <div className="Mobile__menuBottom">
            <Link style={{ textDecoration: "none", color: "black" }}>
              <div className="Wishlist">
                <FavoriteBorderIcon />
                <h4>Wishlist</h4>
              </div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }}>
              <div className="store__location">
                <RoomIcon />
                <h4>Store location</h4>
              </div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }}>
              <div className="Call">
                <CallIcon />
                <h4>Customer Service</h4>
              </div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }}>
              <div className="region">
                <LanguageIcon />
                <h4>South Africa / English</h4>
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
