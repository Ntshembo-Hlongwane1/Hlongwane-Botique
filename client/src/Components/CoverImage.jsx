import React from "react";
import cover from "../images/cover.jpeg";
import { BrowserView, MobileView } from "react-device-detect";
//=================================================COVER IMAGE COMPONET==================================================
const CoverImage = () => {
  const Desktopstyle = {
    marginTop: "1.5em",
    width: "100%",
    height: "70vh",
    objectFit: "cover",
  };
  const mobileStyle = {
    marginTop: "1.5em",
    width: "100%",
  };
  return (
    <div>
      <BrowserView>
        <img src={cover} alt="Banner" style={Desktopstyle} />
      </BrowserView>
      <MobileView>
        <img src={cover} alt="Banner" style={mobileStyle} />
      </MobileView>
    </div>
  );
};

export default CoverImage;
