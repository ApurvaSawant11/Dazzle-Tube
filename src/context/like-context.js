import axios from "axios";
import { createContext, useContext } from "react";
import { useVideo } from "./video-context";

const LikeContext = createContext();

const LikeProvider = ({ children }) => {
  const { dispatch } = useVideo();
  const addToLikedVideos = async (video, token) => {
    try {
      const {
        data: { likes },
      } = await axios.post(
        "/api/user/likes",
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({
        type: "SET_LIKED_VIDEOS",
        payload: likes,
      });
    } catch (error) {
      console.error("Error in addToLikedVideos: ", error);
    }
  };

  const removeFromLikedVideos = async (video, token) => {
    try {
      const {
        data: { likes },
      } = await axios.delete(`/api/user/likes/${video._id}`, {
        headers: {
          authorization: token,
        },
      });

      dispatch({
        type: "SET_LIKED_VIDEOS",
        payload: likes,
      });
    } catch (error) {
      console.error("Error in removeFromLikedVideos: ", error);
    }
  };

  const value = {
    addToLikedVideos,
    removeFromLikedVideos,
  };
  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};

const useLike = () => useContext(LikeContext);

export { useLike, LikeProvider };
