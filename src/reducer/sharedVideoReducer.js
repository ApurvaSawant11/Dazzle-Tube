const initialVideoState = {
  videos: [],
  playlist: [],
  categoryList: [],
};

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
  }
};

export { initialVideoState, sharedVideoReducer };
