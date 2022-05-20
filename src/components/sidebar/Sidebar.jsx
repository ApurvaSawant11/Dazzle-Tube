import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GithubIcon,
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
        to="/playlist"
        className={`p-0p5 pr-1 m-1 mr-0 ${
          path.includes("/playlist") ? "active" : ""
        }`}
      >
        <PlaylistIcon className="icon sidebar-icon" size={28} />
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
      <a
        href="https://github.com/ApurvaSawant11"
        target="_blank"
        rel="noopener noreferrer"
        className={`p-0p5 pr-1 m-1 mr-0`}
      >
        <GithubIcon className="icon sidebar-icon" size={24} />
      </a>
    </div>
  );
};

export { Sidebar };
