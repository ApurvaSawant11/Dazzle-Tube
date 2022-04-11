import React from "react";
import "./header.css";
import { HambugerIcon, logo } from "../../assets";
import { Link } from "react-router-dom";
import { SearchBar } from "../searchBar/SearchBar";
import { useAuth } from "../../context";

const Header = () => {
  const { user, setUser, setToken } = useAuth();

  const logoutHandler = () => {
    setUser("");
    localStorage.removeItem("DazzleTube User");
    setToken("");
    localStorage.removeItem("DazzleTube Token");
  };

  return (
    <header className="header-bar secondary">
      <div className="flex-row-center">
        <HambugerIcon className="icon mr-1" size={24} />
        <Link to="/" className="logo flex-row-center">
          <img src={logo} className="logo-img" alt="dazzle tube logo" />
          <div className="logo-name pl-0p5">
            Dazzle<span className="primary-text">Tube</span>
          </div>
        </Link>
      </div>
      <SearchBar />
      <div>
        {!user ? (
          <Link to="/login" className="button inverted-secondary radius-0">
            Login
          </Link>
        ) : (
          <button
            className="button inverted-secondary radius-0"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export { Header };
