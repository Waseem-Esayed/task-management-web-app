const initialState = {
  theme: 'light'
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "theme/toggleTheme":
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };
    default:
      return state;
  }
};

export function toggleTheme() {
  return {
    type: "theme/toggleTheme",
  };
}