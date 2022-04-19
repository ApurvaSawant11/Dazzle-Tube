import React from "react";
import { Link } from "react-router-dom";
import {
  HistoryIcon,
  HomeIcon,
  OutlinedLikeIcon,
  OutlinedWatchLaterIcon,
  PlaylistIcon,
} from "../../assets";
import "./sidebar.css";

const Sidebar = ({ showSidebar }) => {
  return (
    <div className={`sidebar-container flex-column ${showSidebar}`}>
      <Link to="/" className="sidebar-item">
        <HomeIcon className="icon mr-1 sidebar-icon" size={24} />
        <span>Home</span>
      </Link>
      <Link to="/playlist" className="sidebar-item">
        <PlaylistIcon className="icon mr-1 sidebar-icon" size={24} />
        <span>Playlist</span>
      </Link>
      <Link to="/watchLater" className="sidebar-item">
        <OutlinedWatchLaterIcon className="icon mr-1 sidebar-icon" size={24} />
        <span>Watch Later</span>
      </Link>
      <Link to="/likedVideos" className="sidebar-item">
        <OutlinedLikeIcon className="icon mr-1 sidebar-icon" size={24} />
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
