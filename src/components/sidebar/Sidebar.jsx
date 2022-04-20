import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ExploreIcon,
  HistoryIcon,
  HomeIcon,
  OutlinedLikeIcon,
  OutlinedWatchLaterIcon,
  PlaylistIcon,
} from "../../assets";
import "./sidebar.css";

const Sidebar = ({ showSidebar }) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className={`sidebar-container flex-column ${showSidebar}`}>
      <Link
        to="/"
        className={`p-0p5 pr-1 m-1 mr-0 ${path === "/" ? "active" : ""}`}
      >
        <HomeIcon className="icon sidebar-icon" size={24} />
      </Link>
      <Link
        to="/explore"
        className={`p-0p5 pr-1 m-1 mr-0 ${path === "/explore" ? "active" : ""}`}
      >
        <ExploreIcon className="icon sidebar-icon" size={24} />
      </Link>
      <Link
        to="/playlist"
        className={`p-0p5 pr-1 m-1 mr-0 ${
          path === "/playlist" ? "active" : ""
        }`}
      >
        <PlaylistIcon className="icon sidebar-icon" size={24} />
      </Link>
      <Link
        to="/watchLater"
        className={`p-0p5 pr-1 m-1 mr-0 ${
          path === "/watchLater" ? "active" : ""
        }`}
      >
        <OutlinedWatchLaterIcon className="icon sidebar-icon" size={24} />
      </Link>
      <Link
        to="/likedVideos"
        className={`p-0p5 pr-1 m-1 mr-0 ${
          path === "/likedVideos" ? "active" : ""
        }`}
      >
        <OutlinedLikeIcon className="icon sidebar-icon" size={24} />
      </Link>
      <Link
        to="/history"
        className={`p-0p5 pr-1 m-1 mr-0 ${path === "/history" ? "active" : ""}`}
      >
        <HistoryIcon className="icon sidebar-icon" size={24} />
      </Link>
    </div>
  );
};

export { Sidebar };
