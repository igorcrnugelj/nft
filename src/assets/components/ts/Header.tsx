import React from "react";
import { Link } from "react-router-dom";
import "../design/header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <p className="header-logo">
        d<span className="header-logo-span">3</span>vlab
      </p>
      <div className="header-menu">
        <Link className="header-menu-item" to={"/home"}>
          Home
        </Link>

        <Link className="header-menu-item" to={"/generator"}>
          Generator
        </Link>

        <Link className="header-menu-item" to={"#"}>
          Pricing
        </Link>
      </div>
    </div>
  );
};

export default Header;
