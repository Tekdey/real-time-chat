const INITIAL_STATE = {
  authData: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH":
      // Set LocalStorage
      return state;

    case "LOGOUT":
      // Clear LocalStorage
      return state;

    default:
      return state;
  }
};

export default authReducer;
