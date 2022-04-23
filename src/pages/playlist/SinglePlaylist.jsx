import React from "react";
import "./playlist.css";
import { useParams } from "react-router-dom";
import { useVideo } from "../../context";
import { PlaylistVideoCard } from "../../components";

const SinglePlaylist = () => {
  const { playlistId } = useParams();
  const { playlist } = useVideo();

  const list = playlist.find((list) => list._id === playlistId);

  return (
    <div className="video-container">
      <h4 className="flex-row-center">
        {list.title}{" "}
        <span className="text-sm ml-0p5"> ({list.videos.length})</span>
      </h4>
      {list.videos.map((video) => (
        <PlaylistVideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export { SinglePlaylist };
