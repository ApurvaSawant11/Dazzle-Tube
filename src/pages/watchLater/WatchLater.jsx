import React from "react";
import { ListCard } from "../../components";
import { useVideo } from "../../context";
import "./watchLater.css";
import { useDocumentTitle, useScrollToTop } from "../../hooks";
import { useNavigate } from "react-router-dom";

const WatchLater = () => {
  useScrollToTop();
  useDocumentTitle("Watch Later");
  const { videos } = useVideo();
  const navigate = useNavigate();

  const watchLaterList = videos.filter((video) => video.isInWatchLater);
  const isWatchLaterListEmpty = watchLaterList.length < 1;

  return (
    <div className="video-container">
      <h5 className="text-center mb-2p5">Watch Later</h5>

      {isWatchLaterListEmpty ? (
        <div className="flex-column-center">
          <p className="text-lg px-1">
            Looks like you haven't added any videos to Watch Later yet.
          </p>
          <button
            className="button primary radius-0 mt-1"
            onClick={() => navigate("/")}
          >
            Start Adding Now
          </button>
        </div>
      ) : (
        watchLaterList.map((video) => (
          <ListCard key={video._id} video={video} />
        ))
      )}
    </div>
  );
};

export { WatchLater };
