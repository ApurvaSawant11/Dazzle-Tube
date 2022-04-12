import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HistoryIcon,
  HomeIcon,
  LikeIcon,
  PlaylistIcon,
  WatchLaterIcon,
} from "../../assets";
import "./sidebar.css";
import { useGlobalEvent, useDebouncedCallback } from "beautiful-react-hooks";

const Sidebar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const onWindowResize = useGlobalEvent("resize");

  const onWindowResizeHandler = useDebouncedCallback(() => {
    setWindowWidth(window.innerWidth);
  });
  onWindowResize(onWindowResizeHandler);

  return (
    <div
      className={`sidebar-container flex-column ${
        windowWidth < 1240 ? "collapsed" : ""
      }`}
    >
      <Link to="/" className="sidebar-item">
        <HomeIcon className="icon mr-1 sidebar-icon" size={24} />
        <span>Home</span>
      </Link>
      <Link to="/playlist" className="sidebar-item">
        <PlaylistIcon className="icon mr-1 sidebar-icon" size={24} />
        <span>Playlist</span>
      </Link>
      <Link to="/watchLater" className="sidebar-item">
        <WatchLaterIcon className="icon mr-1 sidebar-icon" size={24} />
        <span>Watch Later</span>
      </Link>
      <Link to="/likedVideos" className="sidebar-item">
        <LikeIcon className="icon mr-1 sidebar-icon" size={24} />
        <span>Liked Videos</span>
      </Link>
      <Link to="/history" className="sidebar-item">
        <HistoryIcon className="icon mr-1 sidebar-icon" size={24} />
        <span>History</span>
      </Link>
    </div>
  );
};

export { Sidebar };
