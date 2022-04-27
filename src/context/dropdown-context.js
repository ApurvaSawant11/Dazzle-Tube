import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  WatchLaterIcon,
  OutlinedWatchLaterIcon,
  PlaylistIcon,
  TrashIcon,
  LikeIcon,
  OutlinedLikeIcon,
} from "../assets";
import { useVideo, useToast } from "../context";
import {
  addToLikedVideos,
  removeFromLikedVideos,
  addToWatchLater,
  removeFromWatchLater,
  removeFromPlaylist,
  removeFromHistory,
} from "../services";
const DropdownContext = createContext();

const DropdownProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState("");
  const { dispatch } = useVideo();
  const { displayToast } = useToast();

  useEffect(() => {
    const handleDocumentClick = () => {
      if (showDropdown !== "") setShowDropdown("");
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showDropdown]);

  const navigateHandler = () => {
    navigate("/login", { state: { from: location } }, { replace: true });
  };

  const handleToast = (action, list) => {
    action === "remove"
      ? displayToast({
          toastType: "warning",
          toastMessage: `Removed from ${list}`,
        })
      : displayToast({
          toastType: "success",
          toastMessage: `Added to ${list}`,
        });
  };

  const getDropdownList = (isInWatchLater, isInLiked) => {
    // Home page dropdownlist
    let dropdownList = [
      {
        _id: uuid(),
        option: `${isInWatchLater ? "Remove from" : "Add to"} Watch Later`,
        onClickHandler: (video, token) => {
          if (token) {
            if (isInWatchLater) {
              removeFromWatchLater(dispatch, video._id, token);
              handleToast("remove", "Watch Later");
            } else {
              addToWatchLater(dispatch, video, token);
              handleToast("add", "Watch Later");
            }
          } else {
            navigateHandler();
          }
        },
        Icon: () =>
          isInWatchLater ? (
            <WatchLaterIcon size={22} className="mr-0p5" />
          ) : (
            <OutlinedWatchLaterIcon size={22} className="mr-0p5" />
          ),
      },
      {
        _id: uuid(),
        option: "Save to Playlist",
        Icon: () => <PlaylistIcon size={24} className="mr-0p5" />,
      },
    ];

    //History page dropdown
    dropdownList =
      location.pathname === "/history"
        ? [
            {
              _id: uuid(),
              option: "Remove from History",
              onClickHandler: (video, token) => {
                removeFromHistory(dispatch, video._id, token);
                handleToast("remove", "History");
              },
              Icon: () => <TrashIcon size={16} className="mr-0p5" />,
            },
          ]
        : dropdownList;

    // Playlist card dropdown
    dropdownList = location.pathname.includes("/playlist")
      ? [
          {
            _id: uuid(),
            option: "Remove from playlist",
            onClickHandler: (playlistId, videoId, token) => {
              if (token) {
                removeFromPlaylist(dispatch, playlistId, videoId, token);
                handleToast("remove", "playlist");
              } else {
                navigateHandler();
              }
            },
            Icon: () => <TrashIcon size={16} className="mr-0p5" />,
          },
        ]
      : dropdownList;

    // dropdown for pages other than home, playlist, and, history
    dropdownList =
      ["/", "/history"].includes(location.pathname) ||
      location.pathname.includes("/playlist")
        ? dropdownList
        : [
            ...dropdownList,
            {
              _id: uuid(),
              option: `${isInLiked ? "Remove from" : "Add to"} Liked`,
              onClickHandler: (video, token) => {
                if (token) {
                  if (isInLiked) {
                    removeFromLikedVideos(dispatch, video._id, token);
                    handleToast("remove", "Liked Videos");
                  } else {
                    addToLikedVideos(dispatch, video, token);
                    handleToast("add", "Liked Videos");
                  }
                } else {
                  navigateHandler();
                }
              },
              Icon: () =>
                isInLiked ? (
                  <LikeIcon size={24} className="mr-0p5" />
                ) : (
                  <OutlinedLikeIcon size={24} className="mr-0p5" />
                ),
            },
          ];

    return dropdownList;
  };

  const toggleShowDropdownList = (event, _id) => {
    event.stopPropagation();

    setShowDropdown((prev) => (prev === _id ? "" : _id));
  };

  const value = {
    showDropdown,
    setShowDropdown,
    toggleShowDropdownList,
    getDropdownList,
  };
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

const useDropdown = () => useContext(DropdownContext);

export { useDropdown, DropdownProvider };
