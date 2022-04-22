import axios from "axios";

const createNewPlaylist = async (dispatch, title, token) => {
  try {
    const {
      data: { playlists },
    } = await axios.post(
      "/api/user/playlists",
      {
        playlist: {
          title: title,
          description: "",
        },
      },
      {
        headers: { authorization: token },
      }
    );

    dispatch({
      type: "NEW_PLAYLIST",
      payload: playlists,
    });
  } catch (error) {
    console.error("Error in createNewPlaylist service: ", error);
  }
};

const deletePlaylist = () => {};

const addToPlaylist = async (dispatch, _id, video, token) => {
  try {
    const {
      data: { playlist },
    } = await axios.post(
      `/api/user/playlists/${_id}`,
      { video },
      { headers: { authorization: token } }
    );
    dispatch({
      type: "SET_PLAYLIST_VIDEOS",
      payload: playlist,
    });
  } catch (error) {
    console.error("Error in addToPlaylist service: ", error);
  }
};

const removeFromPlaylist = async (dispatch, playlistID, videoID, token) => {
  try {
    const {
      data: { playlist },
    } = await axios.delete(`/api/user/playlists/${playlistID}/${videoID}`, {
      headers: { authorization: token },
    });

    dispatch({
      type: "SET_PLAYLIST_VIDEOS",
      payload: playlist,
    });
  } catch (error) {
    console.log("Error in removeFromPlaylist service: ", error);
  }
};

export { createNewPlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist };
