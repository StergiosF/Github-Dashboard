import { useCallback, useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { debounce } from "../Utils/debounce";
import { searchUsers } from "../Services/github.service";
import { useUser } from "../Context/UserContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState(""); // Tracks the input value

  const { error, suggestions, dispatch } = useUser(); // Gets setUsername from UserContext

  const navigate = useNavigate();

  // Debounced search function (triggers after 500ms of inactivity)
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm.trim()) {
        dispatch({ type: "suggestions/clear" });
        return;
      }
      try {
        const data = await searchUsers(searchTerm); // Fetch GitHub users
        dispatch({ type: "suggestions/loaded", payload: data }); // Update suggestions
      } catch (error) {
        dispatch({ type: "error", payload: error.message });
      }
    }, 500),
    []
  );

  // Trigger debouncedSearch whenever the query changes
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  function onSearch(user) {
    dispatch({ type: "searchUsername", payload: user });
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
    dispatch({ type: "CLEAR_USER" }); // Clear selected user
  }

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e)} // Update query on typing
        placeholder="Search GitHub user..."
      />

      {error && (
        <div className={styles.dropdownContainer}>
          <ErrorMessage /> {/* Loads Error if it exist */}
        </div>
      )}

      {/* Show suggestions dropdown */}
      {query && !error && suggestions.length === 0 ? (
        <div className={styles.dropdownContainer}>
          <LoadingSpinner /> {/* Loads spinner on typing */}
        </div>
      ) : (
        <ul
          className={`${styles.suggestionsDropdown} ${
            suggestions.length > 0 ? styles.visible : ""
          }`}
        >
          {suggestions.map((user) => (
            <li
              key={user.id}
              onClick={() => {
                onSearch(user.login); // Propagate selected username to context
                setQuery(""); // Clear input
                navigate(`/profile/${user.login}`);
                dispatch({ type: "suggestions/clear" }); // Clear suggestions
              }}
            >
              <img src={user.avatar_url} alt={user.login} />
              {user.login}
              {user.follower_url}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
