const INITIAL_STATE = {
  user: {},
  isLoading: false,
  logError: [],
  storageIsChecked: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        logError: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        storageIsChecked: true,
      };
    case "LOGOUT":
      return { ...INITIAL_STATE, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
    default:
      return state;
  }
};
