import { useParams } from "react-router-dom";
import styles from "./UserProfilePage.module.css";
import useGitHubAPI from "../Hooks/useGitHubAPI";
import UserCard from "../Components/UserCard";
import SearchBar from "../Components/SearchBar";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorMessage from "../Components/ErrorMessage";

function UserProfilePage() {
  const { username } = useParams();
  const { user, isLoading, error } = useGitHubAPI(username); // Get user data from hook

  return (
    <div className={styles.userProfilePage}>
      <SearchBar />
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage />}
      {user && !isLoading && !error && <UserCard />}
    </div>
  );
}

export default UserProfilePage;
