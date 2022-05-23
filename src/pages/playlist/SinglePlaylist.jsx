import React from "react";
import "./playlist.css";
import { useNavigate, useParams } from "react-router-dom";
import { useVideo } from "../../context";
import { PlaylistVideoCard } from "../../components";
import { useDocumentTitle } from "../../hooks";

const SinglePlaylist = () => {
  const { playlistId } = useParams();
  const { playlist } = useVideo();
  const navigate = useNavigate();

  const list = playlist.find((list) => list._id === playlistId);
  useDocumentTitle(list.title);
  return (
    <div className="video-container">
      <h4 className="flex-row-center">
        {list.title}{" "}
        <span className="text-sm ml-0p5"> ({list.videos.length})</span>
      </h4>
      {list.videos.length > 0 ? (
        list.videos.map((video) => (
          <PlaylistVideoCard key={video._id} video={video} />
        ))
      ) : (
        <div className="flex-column-center">
          <p className="text-lg px-1">Looks like your playlist is empty</p>
          <button
            className="button primary radius-0 mt-1"
            onClick={() => navigate("/")}
          >
            Start Adding Now
          </button>
        </div>
      )}
    </div>
  );
};

export { SinglePlaylist };
