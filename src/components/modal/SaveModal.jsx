import { WatchLaterIcon, CloseIcon } from "../../assets";
import { useVideo, useAuth } from "../../context";
import { addToWatchLater, removeFromWatchLater } from "../../services";
import "./modal.css";

export const SaveModal = ({ video, showModal, setShowModal }) => {
  const { token } = useAuth();
  const { dispatch } = useVideo();

  const watchLaterHandler = (e) => {
    if (e.target.checked) {
      addToWatchLater(dispatch, video, token);
    } else {
      removeFromWatchLater(dispatch, video, token);
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
        className="m-auto modal radius-0"
      >
        <div className="flex-row-center content-between border-bottom-1 px-1 pt-1 pb-0p5">
          Save to...
          <button
            onClick={() => setShowModal(!showModal)}
            className="plain-button secondary-text"
          >
            <CloseIcon />
          </button>
        </div>

        <ul>
          <li className="modal-list-item p-1">
            <label htmlFor="watch-later" className="">
              <input
                type="checkbox"
                name="watchLater"
                id="watch-later"
                checked={video.isInWatchLater}
                onChange={watchLaterHandler}
                className="checkbox-field mr-0p5"
              />
              Watch Later
            </label>

            <WatchLaterIcon size={18} />
          </li>
        </ul>
      </div>
    </div>
  );
};
