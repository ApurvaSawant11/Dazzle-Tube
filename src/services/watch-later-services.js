import axios from "axios";

const addToWatchLater = async (dispatch, video, token) => {
  try {
    const {
      data: { watchlater },
    } = await axios.post(
      "/api/user/watchlater",
      { video },
      { headers: { authorization: token } }
    );

    dispatch({
      type: "SET_WATCH_LATER",
      payload: watchlater,
    });
  } catch (error) {
    console.error("Error in addToWatchLater: ", error);
  }
};

const removeFromWatchLater = async (dispatch, _id, token) => {
  try {
    const {
      data: { watchlater },
    } = await axios.delete(`/api/user/watchlater/${_id}`, {
      headers: { authorization: token },
    });

    dispatch({ type: "SET_WATCH_LATER", payload: watchlater });
  } catch (error) {
    console.error("Error in removeFromWatchLater: ", error);
  }
};

export { addToWatchLater, removeFromWatchLater };
