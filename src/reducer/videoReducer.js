const initialVideoState = {
  videos: [],
  playlist: [],
  categoryList: [],
};

const videoReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_VIDEOS":
      return { ...state, videos: action.payload };

    case "INITIALIZE_CATEGORIES":
      return { ...state, categoryList: action.payload };
  }
};

export { initialVideoState, videoReducer };
