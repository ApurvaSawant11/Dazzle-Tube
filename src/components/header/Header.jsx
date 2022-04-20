import React, { useEffect } from "react";
import "./header.css";
import { HambugerIcon, logo } from "../../assets";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../searchBar/SearchBar";
import { useAuth } from "../../context";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { user, setUser, setToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setShowSidebar(
      location.pathname.includes("/watch/") || window.innerWidth < 760
        ? "display-none"
        : ""
    );

    const handleWindowResize = () => {
      if (!location.pathname.includes("/watch/")) {
        setShowSidebar(window.innerWidth < 760 ? "display-none" : "");
      }
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [location.pathname]);

  const sidebarHandler = () => {
    setShowSidebar(
      showSidebar === "display-none" ? "small-screen-sidebar" : "display-none"
    );
  };

  const logoutHandler = () => {
    setUser("");
    localStorage.removeItem("DazzleTube User");
    setToken("");
    localStorage.removeItem("DazzleTube Token");
  };

  return (
    <header className="header-bar secondary">
      <div className="flex-row-center">
        <HambugerIcon
          className={`icon mr-1 ${
            location.pathname.includes("/watch/")
              ? ""
              : window.innerWidth < 760
              ? ""
              : "display-none"
          }`}
          size={24}
          onClick={sidebarHandler}
        />
        <Link to="/" className="logo flex-row-center">
          <img src={logo} className="logo-image" alt="dazzle tube logo" />
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
