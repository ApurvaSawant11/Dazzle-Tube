import React from "react";
import "./home.css";
import { useVideo } from "../../context";
import { VideoCard } from "../../components";
import { searchVideos, sortVideos, sortVideosByDate } from "../../services";
import { useDocumentTitle } from "../../hooks";

const Home = () => {
  useDocumentTitle("Home");
  const { videos, categoryList, search, sortByCategory, sortByDate, dispatch } =
    useVideo();

  const searchedByName = searchVideos([...videos], search);
  const sortedByCategory = sortVideos(searchedByName, sortByCategory);
  const sortedByDate = sortVideosByDate(sortedByCategory, sortByDate);

  return (
    <div className="video-container">
      <div className="category-chips flex-row-center">
        {categoryList &&
          categoryList.map(({ categoryName }, index) => (
            <div
              className={`chip ${
                sortByCategory === categoryName ? "active" : ""
              }`}
              key={index}
              onClick={() =>
                dispatch({ type: "SORT_BY_CATEGORY", payload: categoryName })
              }
            >
              {categoryName}
            </div>
          ))}
      </div>
      <div className="video-grid">
        {videos &&
          sortedByDate.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
      </div>
    </div>
  );
};

export { Home };
