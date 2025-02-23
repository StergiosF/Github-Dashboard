import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import styles from "./FollowingPage.module.css";
import useGitHubAPI from "../Hooks/useGitHubAPI";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorMessage from "../Components/ErrorMessage";
import FollowingCard from "../Components/FollowingCard";

import { IoArrowBackOutline } from "react-icons/io5";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function FollowingPage() {
  const navigate = useNavigate();

  const { username } = useParams();
  const { following, isLoading, error } = useGitHubAPI(username); // Get user data from hook

  return (
    <div className={styles.followingPage}>
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
      {following && !isLoading && !error && <FollowingCard />}
    </div>
  );
}

export default FollowingPage;
