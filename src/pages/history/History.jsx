import React, { useState, useEffect } from "react";
import { ConfirmModal, VideoCard } from "../../components";
import { useAuth, useVideo } from "../../context";
import { clearAllHistory } from "../../services";
import { useDocumentTitle, useScrollToTop } from "../../hooks";

const History = () => {
  useScrollToTop();
  useDocumentTitle("History");
  const { token } = useAuth();
  const { videos, dispatch } = useVideo();
  const [showConfirmModal, setShowConfirmModal] = useState({
    status: false,
    value: false,
  });

  useEffect(() => {
    showConfirmModal.value && clearAllHistory(dispatch, token);
  }, [showConfirmModal.value]);

  const clearHistoryHandler = () => {
    setShowConfirmModal({ ...showConfirmModal, status: true });
  };

  return (
    <div className="video-container">
      <div className="flex-row">
        <h5 className="text-center flex-grow-1">History</h5>
        <button
          className="plain-button primary-text p-0p5 mr-1"
          onClick={clearHistoryHandler}
        >
          Clear history
        </button>
      </div>
      <div className="video-grid">
        {videos
          .filter((video) => video.isInHistory)
          .map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
      </div>

      {showConfirmModal.status && (
        <ConfirmModal
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </div>
  );
};

export { History };
