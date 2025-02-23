import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import styles from "./RepositoriesPage.module.css";
import useGitHubAPI from "../Hooks/useGitHubAPI";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorMessage from "../Components/ErrorMessage";
import RepoCard from "../Components/RepoCard";

import { IoArrowBackOutline } from "react-icons/io5";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function RepositoriesPage() {
  const navigate = useNavigate();

  const { username } = useParams();
  const { repos, isLoading, error } = useGitHubAPI(username); // Get user data from hook

  return (
    <div className={styles.repositoriesPage}>
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
      {repos && !isLoading && !error && <RepoCard />}
    </div>
  );
}

export default RepositoriesPage;
