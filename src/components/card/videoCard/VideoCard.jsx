import React from "react";
import "./videoCard.css";
import { MoreIcon } from "../../../assets";

const VideoCard = ({ video }) => {
  const { _id, title } = video;
  return (
    <div className="video-card">
      <img className="card-img" src={`https://i.ytimg.com/vi/${_id}/0.jpg`} />
      <div className="flex-row">
        <div className="card-title pr-0p5">{title}</div>
        <span>
          <MoreIcon size={24} />
        </span>
      </div>
    </div>
  );
};

export { VideoCard };
