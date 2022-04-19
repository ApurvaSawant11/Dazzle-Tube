import React from "react";
import "./videoCard.css";
import { MoreIcon } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useDropdown } from "../../../context";

const VideoCard = ({ video }) => {
  const { _id, title, isInWatchLater, isInLiked } = video;
  const navigate = useNavigate();
  const { showDropdown, toggleShowDropdownList, getDropdownList } =
    useDropdown();
  const dropdownList = getDropdownList(isInWatchLater, isInLiked);

  const onVideoClickHandler = () => {
    navigate(`/watch/${_id}`);
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
                onClick={() => {
                  onClickHandler(video._id, video);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") onClickHandler(video._id, video);
                }}
              >
                <Icon /> {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export { VideoCard };
