import React, { useState } from "react";
import { DragIcon, MoreIcon } from "../../../assets";
import { useAuth, useDropdown } from "../../../context";
import { SaveModal } from "../../modal/SaveModal";
import { useParams, useNavigate } from "react-router-dom";

const PlaylistVideoCard = ({ video }) => {
  const { token } = useAuth();
  const { _id, title, isInWatchLater, isInLiked } = video;
  const { showDropdown, toggleShowDropdownList, getDropdownList } =
    useDropdown();
  const dropdownList = getDropdownList(isInWatchLater, isInLiked);
  const [showModal, setShowModal] = useState(false);
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const onVideoClickHandler = () => {
    navigate(`/watch/${_id}`);
  };

  return (
    <div className="list-card">
      <DragIcon className="icon align-self-center" size={28} />
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
                  onClickHandler(playlistId, video._id, token);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter")
                    onClickHandler(playlistId, video._id, token);
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

export { PlaylistVideoCard };
