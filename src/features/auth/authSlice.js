const initialState = {
  isLoggedIn: false,
  username: "",
  isDemo: false,
  justLoggedOut: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth/setAuth":
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        username: action.payload.username,
        justLoggedOut: false,
      };
    case "auth/setDemo":
      return {
        ...state,
        isDemo: true,
        username: "Demo User",
      };
    case "auth/logout":
      return {
        ...state,
        isDemo: false,
        isLoggedIn: false,
        username: "",
        justLoggedOut: true,
      };
    default:
      return state;
  }
};

export function setAuth(isLoggedIn, username) {
  return {
    type: "auth/setAuth",
    payload: {
      isLoggedIn,
      username,
    },
  };
}

export function setDemo() {
  return {
    type: "auth/setDemo",
  };
}

export function logout() {
  return {
    type: "auth/logout",
  };
}
