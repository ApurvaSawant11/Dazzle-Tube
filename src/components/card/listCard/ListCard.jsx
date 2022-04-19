import React from "react";
import { MoreIcon } from "../../../assets";
import "./listCard.css";
import { useAuth, useDropdown } from "../../../context";

const ListCard = ({ video }) => {
  const { token } = useAuth();
  const { _id, title, isInWatchLater, isInLiked } = video;
  const { showDropdown, toggleShowDropdownList, getDropdownList } =
    useDropdown();
  const dropdownList = getDropdownList(isInWatchLater, isInLiked);
  return (
    <div className="list-card">
      <div className="card-img-container">
        <img
          className="list-card-img"
          src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
          alt={title}
        />
      </div>
      <div className="list-card-details">{title}</div>
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
                  onClickHandler(video, token);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") onClickHandler(video, token);
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

export { ListCard };
