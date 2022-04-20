import React from "react";
import { ListCard } from "../../components";
import { useVideo } from "../../context";
import "./watchLater.css";

const WatchLater = () => {
  const { videos } = useVideo();

  return (
    <div className="video-container">
      <h5 className="text-center mb-2p5">Watch Later</h5>

      {videos
        .filter((video) => video.isInWatchLater)
        .map((video) => (
          <ListCard key={video._id} video={video} />
        ))}
    </div>
  );
};

export { WatchLater };
