import React from "react";
import { ListCard } from "../../components";
import { useVideo } from "../../context";

const LikedVideos = () => {
  const { videos } = useVideo();
  return (
    <div className="video-container">
      <h5 className="text-center mb-2p5">Liked Videos</h5>

      {videos
        .filter((video) => video.isInLiked)
        .map((video) => (
          <ListCard key={video._id} video={video} />
        ))}
    </div>
  );
};

export { LikedVideos };