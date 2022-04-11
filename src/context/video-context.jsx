import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { videoReducer, initialVideoState } from "../reducer/videoReducer";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialVideoState);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { categories },
        } = await axios.get("/api/categories");
        dispatch({
          type: "INITIALIZE_CATEGORIES",
          payload: categories,
        });
      } catch (error) {
        console.error("Error in initializing categories", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { videos },
        } = await axios.get("/api/videos");
        dispatch({
          type: "INITIALIZE_VIDEOS",
          payload: videos,
        });
      } catch (error) {
        console.error("Error in initializing categories", error);
      }
    })();
  }, []);

  const value = {
    videos: state.videos,
    categoryList: state.categoryList,
    playlist: state.playlist,
    dispatch,
  };
  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { useVideo, VideoProvider };
