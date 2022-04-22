import React, { useState } from "react";
import { MoreIcon } from "../../../assets";
import "./listCard.css";
import { useAuth, useDropdown } from "../../../context";
import { SaveModal } from "../../modal/SaveModal";
import { useNavigate } from "react-router-dom";

const ListCard = ({ video }) => {
  const { token } = useAuth();
  const { _id, title, isInWatchLater, isInLiked } = video;
  const { showDropdown, toggleShowDropdownList, getDropdownList } =
    useDropdown();
  const dropdownList = getDropdownList(isInWatchLater, isInLiked);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onVideoClickHandler = () => {
    navigate(`/watch/${_id}`);
  };

  const onListItemClick = (onClickHandler, option) => {
    option === "Save to Playlist"
      ? setShowModal(true)
      : onClickHandler(video, token);
  };

  return (
    <div className="list-card">
      <div className="card-img-container" onClick={onVideoClickHandler}>
        <img
          className="list-card-img"
          src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
          alt={title}
        />
      </div>
      <div className="list-card-details" onClick={onVideoClickHandler}>
        {title}
      </div>
      <div className="dropdown-icon">
        <MoreIcon
          size={24}
          onClick={(event) => {
            toggleShowDropdownList(event, video._id);
          }}
        />

        {showDropdown === _id && (
          <ul tabIndex="0" className="card-dropdown list-dropdown">
            {dropdownList.map(({ _id, option, onClickHandler, Icon }) => (
              <li
                key={_id}
                tabIndex="0"
                onClick={() => {
                  onListItemClick(onClickHandler, option);
                }}
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

export { ListCard };
