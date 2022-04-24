import React, { useState } from "react";
import "./videoCard.css";
import { MoreIcon } from "../../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useDropdown, useVideo } from "../../../context";
import { SaveModal } from "../../modal/SaveModal";
import { addToHistory } from "../../../services";

const VideoCard = ({ video }) => {
  const { token } = useAuth();
  const { dispatch } = useVideo();
  const { _id, title, isInWatchLater, isInLiked } = video;
  const navigate = useNavigate();
  const { showDropdown, toggleShowDropdownList, getDropdownList } =
    useDropdown();
  const dropdownList = getDropdownList(isInWatchLater, isInLiked);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const onVideoClickHandler = () => {
    navigate(`/watch/${_id}`);
    !video.isInHistory && addToHistory(dispatch, video, token);
  };

  const onListItemClick = (onClickHandler, option) => {
    option === "Save to Playlist"
      ? token
        ? setShowModal(true)
        : navigate("/login", { state: { from: location } }, { replace: true })
      : onClickHandler(video, token);
  };
  return (
    <div className="video-card">
      <img
        className="card-img"
        src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
        onClick={onVideoClickHandler}
        alt={title}
      />
      <div className="flex-row card-details">
        <div className="card-title pr-0p5">{title}</div>
        <span>
          <MoreIcon
            size={24}
            onClick={(event) => {
              toggleShowDropdownList(event, video._id);
            }}
          />
        </span>

        {showDropdown === _id && (
          <ul tabIndex="0" className="card-dropdown">
            {dropdownList.map(({ _id, option, onClickHandler, Icon }) => (
              <li
                key={_id}
                tabIndex="0"
                onClick={() => onListItemClick(onClickHandler, option)}
                onKeyDown={(event) => {
                  if (event.key === "Enter")
                    onListItemClick(onClickHandler, option);
                }}
              >
                <Icon /> {option}
              </li>
            ))}
          </ul>
        )}

        {showModal && (
          <SaveModal
            video={video}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
};

export { VideoCard };
