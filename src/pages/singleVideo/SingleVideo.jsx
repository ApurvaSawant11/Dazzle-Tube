import React, { useState } from "react";
import "./singleVideo.css";
import {
  useParams,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuth, useToast, useVideo } from "../../context";
import { Note, SaveModal, VideoCard } from "../../components";
import { addToLikedVideos, removeFromLikedVideos } from "../../services";
import {
  CommentIcon,
  DotIcon,
  OutlinedLikeIcon,
  LikeIcon,
  PlaylistIcon,
  ShareIcon,
} from "../../assets";
import { getRandomColor } from "../../utils/getRandomColor";

const SingleVideo = () => {
  const { token, user } = useAuth();
  const { displayToast } = useToast();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { watchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { videos, dispatch } = useVideo();
  const video = videos?.find((video) => video._id === watchId);

  const likeHandler = (video) => {
    if (token) {
      if (video.isInLiked) {
        removeFromLikedVideos(dispatch, video._id, token);
        displayToast({
          toastType: "warning",
          toastMessage: "Remove from Liked Videos",
        });
      } else {
        addToLikedVideos(dispatch, video, token);
        displayToast({
          toastType: "success",
          toastMessage: "Added to Liked Videos",
        });
      }
    } else {
      navigate("/login", { state: { from: location } }, { replace: true });
    }
  };

  const addCommentHandler = () => {
    if (newComment.trim() !== "") {
      const commentDetails = {
        firstName: `${user.firstName}`,
        lastName: `${user.lastName}`,
        comment: newComment,
        color: getRandomColor(),
      };
      dispatch({
        type: "SET_COMMENT",
        payload: { watchId, commentDetails },
      });
      setNewComment("");
    } else {
      displayToast({
        toastType: "error",
        toastMessage: "Please enter valid comment",
      });
    }
  };

  return (
    video && (
      <div className="video-container flex-column container-width p-1">
        <div className="flex-row gap-2 play-video-container">
          <div className="flex-grow-1">
            <div className="play-container">
              <iframe
                src={`https://www.youtube.com/embed/${watchId}`}
                title={video.title}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="1"
              />
            </div>
            <h5>{video.title}</h5>
            <div className="action-container flex-row wrap gap-1 pb-1">
              <div className="flex-row-center">
                {video.creator} <DotIcon /> {video.uploaded}
              </div>

              <div className="flex-row">
                <div className="action-icon" onClick={() => likeHandler(video)}>
                  {video.isInLiked ? (
                    <>
                      <LikeIcon size={24} />
                      <span className="pl-0p5">Liked</span>
                    </>
                  ) : (
                    <>
                      <OutlinedLikeIcon size={24} />
                      <span className="pl-0p5">Like</span>
                    </>
                  )}
                </div>
                <div className="action-icon">
                  <ShareIcon className="rotate-y-180" size={24} />
                  <span className="pl-0p5">Share</span>
                </div>
                <div className="action-icon" onClick={() => setShowModal(true)}>
                  <PlaylistIcon size={24} />
                  <span className="pl-0p5">Save</span>
                </div>
              </div>
            </div>

            <div className="desc pb-1 border-top-1">
              <h6>Description:</h6>
              {video.description}
            </div>
          </div>

          {/* Adding notes to video */}
          <Note video={video} />
        </div>

        <div className="border-top-3 pt-1p5">
          {/* Adding comments to the video  */}
          <div className="border-bottom-3 pb-2">
            <div className="flex-row-center content-between gap-0p5">
              <div className="text-lg p-0p5 flex-row-center gap-0p5 fw-700">
                <CommentIcon /> Comments
              </div>
              <div>
                {!showCommentInput && (
                  <button
                    className="button secondary radius-0"
                    onClick={() => setShowCommentInput(true)}
                  >
                    Add Comment
                  </button>
                )}
              </div>
            </div>

            {showCommentInput && (
              <div className="new-comment-container mt-1">
                <div className="input-field input-comment">
                  <div className="flex-row-center gap-1">
                    <div className="avatar rounded size-xs secondary">
                      {`${user.firstName[0]}${user.lastName[0]}`.toUpperCase()}
                    </div>
                    <input
                      type="text"
                      className="input"
                      placeholder="Add comment..."
                      value={newComment}
                      required
                      onChange={(e) => setNewComment(e.target.value)}
                      onClick={() => setShowCommentInput(true)}
                    />

                    <div className="flex-row gap-1">
                      <button
                        className="button primary radius-0"
                        onClick={addCommentHandler}
                      >
                        Comment
                      </button>
                      <button
                        className="button inverted-secondary radius-0"
                        onClick={() => {
                          setShowCommentInput(false);
                          setNewComment("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <span className="bar"></span>
                </div>
              </div>
            )}

            {/* Display comments */}
            {video.comments?.map(
              ({ firstName, lastName, comment, color }, index) => (
                <div className="mt-1p5 flex-row" key={index}>
                  <div
                    className="avatar rounded secondary size-xs"
                    style={{
                      background: color,
                      color: "white",
                    }}
                  >
                    {`${firstName[0]}${lastName[0]}`.toUpperCase()}
                  </div>
                  <div className="ml-1">
                    <div className="fw-700">
                      {firstName} {lastName}
                    </div>
                    <div>{comment}</div>
                  </div>
                </div>
              )
            )}
          </div>

          <h5 className="text-center mt-2">
            More videos<span className="primary-text">...</span>
          </h5>
          <div className="flex-row gap-2 mt-2 wrap content-between">
            {videos &&
              videos
                .slice(0, 8)
                .map((video) => <VideoCard key={video._id} video={video} />)}
          </div>
        </div>
        {showModal &&
          (token ? (
            <SaveModal
              video={video}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          ))}
      </div>
    )
  );
};

export { SingleVideo };
