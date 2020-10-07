import React from "react";
import CoverImage from "./CoverImage";
import NavBar from "./Header/NavBar";
import { BrowserView, MobileView } from "react-device-detect";
const HomePage = () => {
  return (
    <div>
      {/* BROWSE VIEW */}
      <BrowserView>
        <NavBar />
        <CoverImage />
      </BrowserView>

      {/* MOBILE VIEW */}
      <MobileView>
        <NavBar />
        <CoverImage />
        
      </MobileView>
    </div>
  );
};

export default HomePage;
