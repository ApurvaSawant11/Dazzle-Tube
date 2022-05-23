import React from "react";
import { useNavigate } from "react-router-dom";
import { ListCard } from "../../components";
import { useVideo } from "../../context";
import { useDocumentTitle, useScrollToTop } from "../../hooks";

const LikedVideos = () => {
  useScrollToTop();
  useDocumentTitle("Liked Videos");
  const { videos } = useVideo();
  const navigate = useNavigate();
  const likedVideosList = videos.filter((video) => video.isInLiked);
  const isLikedListEmpty = likedVideosList.length < 1;
  return (
    <div className="video-container">
      <h5 className="text-center mb-2p5">Liked Videos</h5>

      {isLikedListEmpty ? (
        <div className="flex-column-center">
          <p className="text-lg">Looks like you have not liked any videos</p>
          <button
            className="button primary radius-0 mt-1"
            onClick={() => navigate("/")}
          >
            Explore Videos Now
          </button>
        </div>
      ) : (
        likedVideosList.map((video) => (
          <ListCard key={video._id} video={video} />
        ))
      )}
    </div>
  );
};

export { LikedVideos };
