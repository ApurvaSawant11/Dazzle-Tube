import React from "react";
import { PlaylistFolderCard } from "../../components";
import { useVideo } from "../../context";

const Playlist = () => {
  const { playlist } = useVideo();
  return (
    <div className="video-container">
      <h4 className="text-center">Playlists</h4>

      <div className="video-grid">
        {playlist?.map((list) => (
          <PlaylistFolderCard key={list._id} list={list} />
        ))}
      </div>
    </div>
  );
};

export { Playlist };
