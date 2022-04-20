import React from "react";
import "./home.css";
import { useVideo } from "../../context";
import { VideoCard } from "../../components";

const Home = () => {
  const { videos, categoryList } = useVideo();
  return (
    <div className="video-container">
      <div className="category-chips flex-row-center">
        {categoryList &&
          categoryList.map(({ categoryName }, index) => (
            <div className="chip" key={index}>
              {categoryName}
            </div>
          ))}
      </div>
      <div className="video-grid">
        {videos &&
          videos.map((video) => <VideoCard key={video._id} video={video} />)}
      </div>
    </div>
  );
};

export { Home };
