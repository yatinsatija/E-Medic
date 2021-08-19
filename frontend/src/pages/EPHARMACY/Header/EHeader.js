import React from "react";
import "./EHeader.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
// import { auth } from "./firebase";

function EHeader() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const hello = () => {
    // localStorage.setItem("isLoggedIn", false);
    localStorage.clear();
    history.push("/");
  };
  const back = () => {
    localStorage.removeItem("order");
    history.push("./epharmacy");

    window.location.reload();
  };

  //   const handleAuthenticaton = () => {
  //     if (user) {
  //       auth.signOut();
  //     }
  //   }
  const name = localStorage.getItem("name");
  const showLogout = () => {
    return (
      <div>
        <form id="add-app">
          <button onClick={(e) => {}}>LOGOUT</button>
        </form>
      </div>
    );
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://images.vexels.com/media/users/3/151981/isolated/lists/f8863741dba8034b3e1d4809a01c782a-stethoscope-icon-medical-icons.png"
        />
      </Link>

      <h2 style={{ color: "white", marginLeft: "2%" }}>
        Hello {localStorage.getItem("name")}
      </h2>

      {/* <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div> */}

      <div className="header__nav" style={{ marginLeft: "45%" }}>
        <div>
          <button onClick={(e) => history.push("/myorders")}>MY ORDERS</button>
        </div>
        {/* <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link> */}
        <div className="header__option" onClick={(e) => showLogout()}>
          <span>Welcome {name}</span>
        </div>

        <div className="header__option" onClick={(e) => back()}>
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        {/* <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div> */}

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
        <div>
          <button onClick={(e) => hello()}>LOGOUT</button>
        </div>
      </div>
    </div>
  );
}

export default EHeader;
