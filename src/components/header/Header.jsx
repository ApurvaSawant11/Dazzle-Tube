import React, { useEffect } from "react";
import "./header.css";
import { HambugerIcon, logo, MoonIcon, SortIcon } from "../../assets";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../searchBar/SearchBar";
import { useAuth, useVideo, useTheme } from "../../context";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { user, setUser, setToken } = useAuth();
  const location = useLocation();
  const { sortByDate, dispatch } = useVideo();
  const { changeTheme } = useTheme();

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
    <div className="header-container ">
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
        <div className="desktop-searchbar">
          <SearchBar />
        </div>
        <div className="flex-row-center">
          <div
            className={`flex-row-center gap-0p5 icon mr-0p5 sort-btn ${
              sortByDate ? "active" : ""
            } `}
            onClick={() => dispatch({ type: "SORT_BY_DATE" })}
          >
            <SortIcon className="icon" size={24} />
            <span className="secondary-text sort-text">Sort Latest</span>
          </div>

          <MoonIcon
            className="icon mr-1"
            size={22}
            onClick={() => changeTheme()}
          />

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
      <div className="mobile-searchbar">
        <SearchBar />
      </div>
    </div>
  );
};

export { Header };
