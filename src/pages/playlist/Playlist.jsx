import React from "react";
import { PlaylistFolderCard } from "../../components";
import { useVideo } from "../../context";
import { useDocumentTitle } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Playlist = () => {
  useDocumentTitle("Playlists");
  const { playlist } = useVideo();
  const navigate = useNavigate();

  return (
    <div className="video-container">
      <h5 className="text-center">Playlists</h5>

      {playlist.length > 0 ? (
        <div className="video-grid">
          {playlist.map((list) => (
            <PlaylistFolderCard key={list._id} list={list} />
          ))}
        </div>
      ) : (
        <div className="flex-column-center">
          <p className="text-lg px-1">
            Looks like you have not created a playlist yet.
          </p>
          <button
            className="button primary radius-0 mt-1"
            onClick={() => navigate("/")}
          >
            Start Creating Now
          </button>
        </div>
      )}
    </div>
  );
};

export { Playlist };
