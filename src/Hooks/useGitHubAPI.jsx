import { useEffect } from "react";
import {
  fetchUser,
  fetchRepos,
  fetchFollowers,
  fetchFollowing,
} from "../Services/github.service";
import { useUser } from "../Context/UserContext";

function useGitHubAPI(username) {
  const { dispatch, isLoading, error, user, repos, followers, following } =
    useUser();

  useEffect(
    function () {
      if (!username) return;

      async function fetchData() {
        dispatch({ type: "loading" });
        try {
          const [userData, reposData, followersData, followingData] =
            await Promise.all([
              fetchUser(username),
              fetchRepos(username),
              fetchFollowers(username),
              fetchFollowing(username),
            ]);
          dispatch({ type: "SET_USER", payload: userData });
          dispatch({ type: "SET_REPOS", payload: reposData });
          dispatch({ type: "SET_FOLLOWERS", payload: followersData });
          dispatch({ type: "SET_FOLLOWING", payload: followingData });
        } catch (err) {
          dispatch({ type: "error", payload: err.message });
        } finally {
          dispatch({ type: "LOADING_COMPLETE" });
        }
      }

      fetchData();
    },
    [username, dispatch]
  );

  return { user, repos, followers, following, error, isLoading };
}

export default useGitHubAPI;
