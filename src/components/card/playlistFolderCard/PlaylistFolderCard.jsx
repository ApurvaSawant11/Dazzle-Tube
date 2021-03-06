import React from "react";
import { Link } from "react-router-dom";
import {
  EmptyPlaylisticon,
  PlaylistPlayIcon,
  TrashIcon,
} from "../../../assets";
import { deletePlaylist } from "../../../services/playlist-services";
import "./playlistFolderCard.css";
import { useAuth, useVideo, useToast } from "../../../context";

const PlaylistFolderCard = ({ list }) => {
  const { token } = useAuth();
  const { dispatch } = useVideo();
  const { displayToast } = useToast();

  const deletePlaylistHandler = () => {
    deletePlaylist(dispatch, list._id, token);
    displayToast({
      toastType: "warning",
      toastMessage: `Playlist ${list.title} deleted`,
    });
  };
  return (
    <div className="playlist-folder-card">
      <Link to={`/playlist/${list._id}`} className="card-link">
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
            <PlaylistPlayIcon className="icon" size={36} />
          </div>
        </div>
      </Link>
      <div className="flex-row-center content-between p-0p5 playlist-card-details">
        <div className="text-lg fw-700">{list.title}</div>
        <TrashIcon
          size={20}
          className="playlist-trash-icon display-none icon"
          onClick={deletePlaylistHandler}
        />
      </div>
    </div>
  );
};

export { PlaylistFolderCard };
