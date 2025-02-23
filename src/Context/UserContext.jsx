import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  username: "",
  suggestions: [],

  isLoading: false,
  error: "",

  user: null,
  repos: [],
  followers: [],
  following: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "error":
      return { ...state, isLoading: false, error: action.payload };

    case "suggestions/loaded":
      return {
        ...state,
        isLoading: false,
        error: initialState.error,
        suggestions: action.payload,
      };
    case "suggestions/clear":
      return { ...state, suggestions: initialState.suggestions };
    case "searchUsername":
      return { ...state, username: action.payload };

    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_REPOS":
      return { ...state, repos: action.payload };
    case "SET_FOLLOWERS":
      return { ...state, followers: action.payload };
    case "SET_FOLLOWING":
      return { ...state, following: action.payload };
    case "LOADING_COMPLETE":
      return { ...state, isLoading: false };
    case "CLEAR_USER":
      return {
        ...state,
        username: "",
        user: null,
        repos: [],
        followers: [],
        following: [],
        suggestions: [],
        error: "",
      };

    default:
      throw new Error("Unknown action type");
  }
}

function UserProvider({ children }) {
  const [
    {
      username,
      suggestions,
      isLoading,
      error,
      user,
      repos,
      followers,
      following,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        username,
        isLoading,
        dispatch,
        suggestions,
        error,
        user,
        repos,
        followers,
        following,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside the UserProvider");
  return context;
}

export { UserProvider, useUser };
