import { Fragment } from "ethers/lib/utils";
import { Link } from "react-router-dom";
import "../../css/layout/header.scss";

const Header = () => {
  const myFunction = () => {
    var x = document.getElementById("myLinks");
    if (x) {
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
  };
  const myFunction2 = () => {
    var x = document.getElementById("myLinks2");
    if (x) {
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
  };
  return (
    <div>
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
          <Link className="header-menu-item" to={"/wallet"}>
            Payment
          </Link>
        </div>
      </div>
      <div className="header-container-dropdown">
        <p className="header-logo-dropdown">
          d<span className="header-logo-span-dropdown">3</span>vlab
        </p>
        <div id="myLinks2">
          <Link className="header-menu-item-dropdown" to={"/home"}>
            Home
          </Link>

          <Link className="header-menu-item-dropdown" to={"/generator"}>
            Generator
          </Link>

          <Link className="header-menu-item-dropdown" to={"#"}>
            Pricing
          </Link>
          <Link className="header-menu-item-dropdown" to={"/wallet"}>
            Payment
          </Link>
        </div>
        <a href="javascript:void(0);" className="icon" onClick={myFunction2}>
          <i className="bi bi-list"></i>
        </a>
      </div>
    </div>
  );
};

export default Header;
