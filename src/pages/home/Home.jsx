import React from "react";
import "./home.css";
import { useVideo } from "../../context";
import { VideoCard } from "../../components";

const Home = () => {
  const { videos, categoryList } = useVideo();
  return (
    <div className="video-container">
      <div className="category-chips flex-row">
        {categoryList &&
          categoryList.map(({ categoryName }) => (
            <div className="chip">{categoryName}</div>
          ))}
      </div>
      <div className="video-grid">
        {videos && videos.map((video) => <VideoCard video={video} />)}
      </div>
    </div>
  );
};

export { Home };
