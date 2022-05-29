import { useState } from "react";
import {
  WatchLaterIcon,
  CloseIcon,
  PlusIcon,
  NewPlaylistIcon,
} from "../../assets";
import { useVideo, useAuth, useToast } from "../../context";
import {
  addToPlaylist,
  addToWatchLater,
  createNewPlaylist,
  removeFromPlaylist,
  removeFromWatchLater,
} from "../../services";
import "./modal.css";

export const SaveModal = ({
  video,
  showModal,
  setShowModal,
  fromPlaylistPage,
}) => {
  const { token } = useAuth();
  const { playlist, dispatch } = useVideo();
  const { displayToast } = useToast();
  const [showNewPlaylistInput, setShowNewPlaylistInput] =
    useState(fromPlaylistPage);
  const [playlistName, setPlaylistName] = useState("");

  const watchLaterHandler = (e) => {
    if (e.target.checked) {
      addToWatchLater(dispatch, video, token);
      displayToast({
        toastType: "success",
        toastMessage: `Added to Watch Later`,
      });
    } else {
      removeFromWatchLater(dispatch, video._id, token);
      displayToast({
        toastType: "warning",
        toastMessage: `Removed from Watch Later`,
      });
    }
  };

  const createPlaylistHandler = () => {
    if (playlistName !== "") {
      createNewPlaylist(dispatch, playlistName, token);
      displayToast({
        toastType: "success",
        toastMessage: `Created playlist : ${playlistName}`,
      });
      setShowNewPlaylistInput(false);
      setPlaylistName("");
      fromPlaylistPage && setShowModal(false);
    } else {
      displayToast({
        toastType: "error",
        toastMessage: "Enter valid playlist name",
      });
    }
  };

  const playlistHandler = (e, playlistID) => {
    if (e.target.checked) {
      addToPlaylist(dispatch, playlistID, video, token);
      displayToast({ toastType: "success", toastMessage: "Added to playlist" });
    } else {
      removeFromPlaylist(dispatch, playlistID, video._id, token);
      displayToast({
        toastType: "warning",
        toastMessage: "Removed from playlist",
      });
    }
  };

  return (
    <div
      onClick={() => setShowModal(!showModal)}
      className={"flex-row-center modal-container"}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="m-auto modal radius-0 border-1"
      >
        {!fromPlaylistPage && (
          <>
            <div className="flex-row-center content-between border-bottom-1 p-1 mb-1">
              Save to...
              <button
                onClick={() => setShowModal(!showModal)}
                className="plain-button secondary-text"
              >
                <CloseIcon />
              </button>
            </div>

            <ul>
              <li className="modal-list-item p-1 pt-0">
                <label htmlFor="watch-later" className="">
                  <input
                    type="checkbox"
                    name="watchLater"
                    id="watch-later"
                    checked={video?.isInWatchLater}
                    onChange={watchLaterHandler}
                    className="checkbox-field mr-0p5"
                  />
                  Watch Later
                </label>

                <WatchLaterIcon size={18} />
              </li>
              {playlist &&
                playlist.map((list) => (
                  <li className="modal-list-item p-1 pt-0" key={list._id}>
                    <label className="">
                      <input
                        type="checkbox"
                        name="watchLater"
                        checked={list.videos.some(
                          (listVideo) => listVideo._id === video._id
                        )}
                        onChange={(e) => playlistHandler(e, list._id)}
                        className="checkbox-field mr-0p5"
                      />
                      {list.title}
                    </label>

                    <NewPlaylistIcon size={16} />
                  </li>
                ))}
            </ul>
          </>
        )}

        <div className="border-top-1">
          {!showNewPlaylistInput && (
            <button
              className="plain-button secondary-text text-center playlist-button"
              onClick={() => setShowNewPlaylistInput(!showNewPlaylistInput)}
            >
              <PlusIcon /> Create new playlist
            </button>
          )}

          {showNewPlaylistInput && (
            <div className="flex-column mt-0p5">
              <input
                type="text"
                placeholder="Enter playlist name..."
                className="playlist-input px-0p5 m-1"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <button
                className="plain-button primary-text text-right p-1 pt-0p5"
                onClick={createPlaylistHandler}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
