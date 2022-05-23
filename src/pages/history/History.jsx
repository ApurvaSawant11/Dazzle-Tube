import React, { useState, useEffect } from "react";
import { ConfirmModal, VideoCard } from "../../components";
import { useAuth, useVideo } from "../../context";
import { clearAllHistory } from "../../services";
import { useDocumentTitle, useScrollToTop } from "../../hooks";
import { useNavigate } from "react-router-dom";

const History = () => {
  useScrollToTop();
  useDocumentTitle("History");
  const { token } = useAuth();
  const { videos, dispatch } = useVideo();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState({
    status: false,
    value: false,
  });

  const historyVideos = videos.filter((video) => video.isInHistory);
  const isHistoryListEmpty = historyVideos.length < 1;

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
        {!isHistoryListEmpty && (
          <button
            className="plain-button primary-text p-0p5 mr-1"
            onClick={clearHistoryHandler}
          >
            Clear history
          </button>
        )}
      </div>
      {isHistoryListEmpty ? (
        <div className="flex-column-center">
          <p className="text-lg px-1">
            Looks like you haven't watched any videos yet.
          </p>
          <button
            className="button primary radius-0 mt-1"
            onClick={() => navigate("/")}
          >
            Start Watching Now
          </button>
        </div>
      ) : (
        <div className="video-grid">
          {historyVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}

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
