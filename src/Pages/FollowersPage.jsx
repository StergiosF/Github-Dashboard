import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import styles from "./FollowersPage.module.css";
import useGitHubAPI from "../Hooks/useGitHubAPI";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorMessage from "../Components/ErrorMessage";
import FollowerCard from "../Components/FollowerCard";

import { IoArrowBackOutline } from "react-icons/io5";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function FollowersPage() {
  const navigate = useNavigate();

  const { username } = useParams();
  const { followers, isLoading, error } = useGitHubAPI(username); // Get user data from hook

  return (
    <div className={styles.followersPage}>
      <div className={styles.searchContainer}>
        <IoArrowBackOutline
          className={styles.backIcon}
          onClick={() => navigate(-1)}
        />
        <SearchBar />
        {/* <MdLightMode className={styles.toggleIcon} /> */}
        <MdDarkMode className={styles.toggleIcon} />
      </div>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage />}
      {followers && !isLoading && !error && <FollowerCard />}
    </div>
  );
}

export default FollowersPage;
