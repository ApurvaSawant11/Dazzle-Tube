import React from "react";
import { Link } from "react-router-dom";
import { EmptyPlaylisticon, PlaylistPlayIcon } from "../../../assets";
import "./playlistFolderCard.css";

const PlaylistFolderCard = ({ list }) => {
  return (
    <Link to={`/playlist/${list._id}`} className="playlist-folder-card">
      <div className="image-container">
        {list.videos.length === 0 ? (
          <div className="empty-image">
            <EmptyPlaylisticon className="empty-playlist-icon" />
          </div>
        ) : (
          <img
            className="card-img"
            src={`https://i.ytimg.com/vi/${list.videos[0]._id}/0.jpg`}
            alt=""
          />
        )}
        <div className="count-overlay flex-column-center">
          <span className="pr-0p5">{list.videos.length}</span>
          <PlaylistPlayIcon size={36} />
        </div>
      </div>
      <div className="card-title pl-0p5 pt-0p5 text-lg">{list.title}</div>
    </Link>
  );
};

export { PlaylistFolderCard };
