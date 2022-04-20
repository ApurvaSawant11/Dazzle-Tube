import axios from "axios";

const addToLikedVideos = async (dispatch, video, token) => {
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

const removeFromLikedVideos = async (dispatch, _id, token) => {
  try {
    const {
      data: { likes },
    } = await axios.delete(`/api/user/likes/${_id}`, {
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

export { addToLikedVideos, removeFromLikedVideos };
