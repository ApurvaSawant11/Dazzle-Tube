import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useLike } from "../context";
import {
  WatchLaterIcon,
  OutlinedWatchLaterIcon,
  PlaylistIcon,
  TrashIcon,
  LikeIcon,
  OutlinedLikeIcon,
} from "../assets";

const DropdownContext = createContext();

const DropdownProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToLikedVideos, removeFromLikedVideos } = useLike();
  const [showDropdown, setShowDropdown] = useState("");

  useEffect(() => {
    const handleDocumentClick = () => {
      if (showDropdown !== "") setShowDropdown("");
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showDropdown]);

  const getDropdownList = (isInWatchLater, isInLiked) => {
    // Home page dropdownlist
    let dropdownList = [
      {
        _id: uuid(),
        option: `${isInWatchLater ? "Remove from" : "Add to"} Watch Later`,
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
              Icon: () => <TrashIcon size={24} className="mr-0p5" />,
            },
          ]
        : dropdownList;

    // dropdown for pages other than home and history
    dropdownList = ["/", "/history"].includes(location.pathname)
      ? dropdownList
      : [
          ...dropdownList,
          {
            _id: uuid(),
            option: `${isInLiked ? "Remove from" : "Add to"} Liked`,
            onClickHandler: (video, token) => {
              if (token) {
                if (isInLiked) {
                  removeFromLikedVideos(video, token);
                } else {
                  addToLikedVideos(video, token);
                }
              } else {
                navigate("/login");
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
