import React from "react";
import DesktopNav from "./DesktopNav";
import "../../StyleSheet/NavBar.css";
import { BrowserView, MobileView } from "react-device-detect";
import MobileNav from "./MobileNav";
const NavBar = () => {
  return (
    <div className="NavBar">
      {/* BROWSER VIEW NAV */}
      <BrowserView>
        <DesktopNav />
      </BrowserView>

      {/* MOBILE VIEW NAV */}
      <MobileView>
        <MobileNav />
      </MobileView>
    </div>
  );
};

export default NavBar;
