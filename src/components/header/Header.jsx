import React, { useEffect } from "react";
import "./header.css";
import { HambugerIcon, logo } from "../../assets";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../searchBar/SearchBar";
import { useAuth } from "../../context";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { user, setUser, setToken } = useAuth();
  const location = useLocation();

  const getSidebarClass = (windowWidth) => {
    if (windowWidth > 1240) {
      return "";
    } else if (windowWidth <= 1240 && windowWidth > 760) {
      return "collapsed";
    } else if (windowWidth < 760) {
      return "collapsed display-none";
    }
  };

  useEffect(() => {
    setShowSidebar(
      location.pathname.includes("/watch")
        ? "collapsed display-none"
        : getSidebarClass(window.innerWidth)
    );

    const handleWindowResize = () => {
      if (!location.pathname.includes("/watch")) {
        setShowSidebar(getSidebarClass(window.innerWidth));
      }
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [location.pathname]);

  const sidebarHandler = () => {
    setShowSidebar(
      showSidebar === "collapsed display-none"
        ? "collapsed-absolute-small"
        : "collapsed display-none"
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
            location.pathname.includes("/watch")
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
