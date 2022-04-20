import React, { useState } from "react";
import "./singleVideo.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth, useVideo } from "../../context";
import { SaveModal, VideoCard } from "../../components";
import { addToLikedVideos, removeFromLikedVideos } from "../../services";
import {
  CommentIcon,
  DotIcon,
  OutlinedLikeIcon,
  LikeIcon,
  PlaylistIcon,
  ShareIcon,
} from "../../assets";

const SingleVideo = () => {
  const { token } = useAuth();
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { watchId } = useParams();
  const navigate = useNavigate();
  const { videos, dispatch } = useVideo();
  const video = videos?.find((video) => video._id === watchId);

  const likeHandler = (video) => {
    if (token) {
      video.isInLiked
        ? removeFromLikedVideos(dispatch, video._id, token)
        : addToLikedVideos(dispatch, video, token);
    } else {
      navigate("/login");
    }
  };

  return (
    video && (
      <div className="video-container flex-row gap-2 p-1 container-width">
        <div className="play-video-container">
          <div className="play-container">
            <iframe
              className=""
              src={`https://www.youtube.com/embed/${watchId}`}
              title={video.title}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen="1"
            />
          </div>
          <h5 className="">{video.title}</h5>
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

          <div className="desc pb-1 border-top-1 border-bottom-1">
            <h6>Description:</h6>
            {video.description}
          </div>

          <div>
            <h6 className="flex-row items-center content-start">
              <CommentIcon /> Comments
              <span className="text-xs fw-500 ml-0p5">(223)</span>
            </h6>

            <div className="new-comment-container">
              <div className="input-field input-comment">
                <div className="flex-row-center gap-1">
                  <div className="avatar rounded primary size-xs">A</div>
                  <input
                    type="text"
                    className="input"
                    placeholder="Add comment..."
                    required
                    onClick={() => setShowButtons(true)}
                  />
                </div>
                <span className="bar"></span>
                {showButtons && (
                  <div className="text-right pt-1">
                    <button
                      className="button inverted-secondary mr-1"
                      onClick={() => setShowButtons(false)}
                    >
                      Cancel
                    </button>
                    <button className="button primary">Comment</button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-1p5 flex-row">
              <div className="avatar rounded secondary size-xs">A</div>
              <div className="comment">
                Great video! Will definitely try this DIY soon
              </div>
            </div>

            <div className="mt-1p5 flex-row">
              <div className="avatar rounded secondary size-xs">A</div>
              <div className="comment">
                Great video! Will definitely try this DIY soon
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {videos &&
            videos
              .slice(0, 4)
              .map((video) => <VideoCard key={video._id} video={video} />)}
        </div>
        {showModal && (
          <SaveModal
            video={video}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    )
  );
};

export { SingleVideo };
