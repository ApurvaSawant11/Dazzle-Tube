import axios from "axios";

const addToHistory = async (dispatch, video, token) => {
  try {
    const {
      data: { history },
    } = await axios.post(
      "/api/user/history",
      { video },
      { headers: { authorization: token } }
    );

    dispatch({
      type: "SET_HISTORY",
      payload: history,
    });
  } catch (error) {
    console.error("Error in addToHistory service: ", error);
  }
};

const removeFromHistory = async (dispatch, _id, token) => {
  try {
    const {
      data: { history },
    } = await axios.delete(`/api/user/history/${_id}`, {
      headers: { authorization: token },
    });
    dispatch({
      type: "SET_HISTORY",
      payload: history,
    });
  } catch (error) {
    console.error("Error in removeFromHistory service: ", error);
  }
};

const clearAllHistory = async (dispatch, token) => {
  try {
    const {
      data: { history },
    } = await axios.delete("/api/user/history/all", {
      headers: { authorization: token },
    });
    dispatch({
      type: "SET_HISTORY",
      payload: history,
    });
  } catch (error) {
    console.error("Error in clearAllHistory service: ", error);
  }
};

export { addToHistory, removeFromHistory, clearAllHistory };
