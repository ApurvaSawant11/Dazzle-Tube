import { v4 as uuid } from "uuid";

const initialVideoState = {
  videos: [],
  playlist: [],
  categoryList: [],
  search: "",
  sortByCategory: "",
  sortByDate: false,
};

const dummyNotes = [
  {
    _id: uuid(),
    note: "This is a dummy note. Now you can takes notes specific to the video",
  },
  {
    _id: uuid(),
    note: "You can add multiple notes and edit them any time you want.",
  },
];

const sharedVideoReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_VIDEOS":
      return {
        ...state,
        videos: [
          ...action.payload.map((video) => ({
            ...video,
            isInWatchLater: false,
            isInLiked: false,
            isInHistory: false,
            notes: dummyNotes,
          })),
        ],
      };

    case "INITIALIZE_CATEGORIES":
      return { ...state, categoryList: action.payload };

    case "SET_LIKED_VIDEOS":
      return {
        ...state,
        videos: state.videos.map((video) => ({
          ...video,
          isInLiked: action.payload.some(
            (element) => element._id === video._id
          ),
        })),
      };

    case "SET_WATCH_LATER":
      return {
        ...state,
        videos: state.videos.map((video) => ({
          ...video,
          isInWatchLater: action.payload.some(
            (element) => element._id === video._id
          ),
        })),
      };

    case "SET_HISTORY":
      return {
        ...state,
        videos: state.videos.map((video) => ({
          ...video,
          isInHistory: action.payload.some(
            (element) => element._id === video._id
          ),
        })),
      };

    case "SET_PLAYLIST":
      return { ...state, playlist: action.payload };

    case "SET_PLAYLIST_VIDEOS":
      return {
        ...state,
        playlist: state.playlist.map((list) =>
          list._id === action.payload._id ? action.payload : list
        ),
      };

    case "SET_COMMENT":
      const { watchId: videoId, commentDetails } = action.payload;
      return {
        ...state,
        videos: [
          ...state.videos.map((video) =>
            video._id === videoId
              ? {
                  ...video,
                  comments: [commentDetails, ...(video.comments ?? [])],
                }
              : { ...video }
          ),
        ],
      };

    case "ADD_NOTES":
      const { watchId, noteDetails } = action.payload;
      return {
        ...state,
        videos: [
          ...state.videos.map((video) =>
            video._id === watchId
              ? {
                  ...video,
                  notes: [...(video.notes ?? []), noteDetails],
                }
              : { ...video }
          ),
        ],
      };

    case "SET_NOTES":
      return {
        ...state,
        videos: action.payload,
      };

    case "SORT_BY_CATEGORY":
      return {
        ...state,
        sortByCategory: action.payload,
      };

    case "SORT_BY_DATE":
      return {
        ...state,
        sortByDate: !state.sortByDate,
      };

    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };
  }
};

export { initialVideoState, sharedVideoReducer };
