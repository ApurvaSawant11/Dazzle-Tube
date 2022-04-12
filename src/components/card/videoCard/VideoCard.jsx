import React, { useState } from "react";
import "./videoCard.css";
import { MoreIcon, PlaylistIcon, WatchLaterIcon } from "../../../assets";

const VideoCard = ({ video }) => {
  const { _id, title } = video;
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="video-card">
      <img className="card-img" src={`https://i.ytimg.com/vi/${_id}/0.jpg`} />
      <div className="flex-row card-details">
        <div className="card-title pr-0p5">{title}</div>
        <span onClick={() => setDropdown(!dropdown)}>
          <MoreIcon size={24} />
        </span>

        {dropdown && (
          <ul className="card-dropdown">
            <li>
              <WatchLaterIcon className="mr-0p5" /> Add to watch later
            </li>
            <li>
              <PlaylistIcon className="mr-0p5" /> Add to playlist
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export { VideoCard };
