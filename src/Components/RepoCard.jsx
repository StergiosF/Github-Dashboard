import { useState } from "react";
import { useUser } from "../Context/UserContext";
import styles from "./RepoCard.module.css";
import { FaStar } from "react-icons/fa6";
import Pagination from "../Utils/Pagination";

function RepoCard() {
  const { user, repos } = useUser();

  // Track sort values for stars and date
  const [sortStars, setSortStars] = useState("most");
  const [sortDate, setSortDate] = useState("newest");

  // Track current page
  const [currentPage, setCurrentPage] = useState(1);

  // Items (repos) per page
  const reposPerPage = 9;

  // Sort the repos based on the selected filters
  const sortedRepos = repos.slice().sort((a, b) => {
    // Sort by stars
    let starComparison = 0;
    if (sortStars === "most") {
      starComparison = b.stargazers_count - a.stargazers_count;
    } else if (sortStars === "least") {
      starComparison = a.stargazers_count - b.stargazers_count;
    }

    // If star counts differ, use that order
    if (starComparison !== 0) {
      return starComparison;
    }

    // If star counts are equal, sort by creation date
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (sortDate === "newest") {
      return dateB - dateA;
    } else if (sortDate === "oldest") {
      return dateA - dateB;
    }

    return 0;
  });

  // Calculate total pages based on sorted repos
  const totalPages = Math.ceil(sortedRepos.length / reposPerPage);

  // Slice the sorted repos array based on the current page
  const startIndex = (currentPage - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const currentRepos = sortedRepos.slice(startIndex, endIndex);

  // Update current page when user clicks 'Next' or 'Previous'
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // If there's no user, don't render anything
  if (!user) return;

  return (
    <div className={styles.repoCard}>
      <div className={styles.topContainer}>
        <div className={styles.smallDetails}>
          <img
            className={styles.userAvatar}
            src={user.avatar_url}
            alt="user-avatar-img"
          />
          <div className={styles.userDetails}>
            <h3
              className={`${styles.fullName} ${
                !user.bio ? styles.notAvailable : ""
              }`}
            >
              {user.name ? user.name : <em>Full name not available</em>}
            </h3>
            <a href={user.html_url} target="_blank" className={styles.username}>
              @{user.login}
            </a>
            <p
              className={`${styles.userDescription} ${
                !user.bio ? styles.notAvailable : ""
              }`}
            >
              {user.bio ? user.bio : <em>Description not available</em>}
            </p>
          </div>
        </div>
        <a
          href={`https://github.com/${user.login}?tab=repositories`}
          target="_blank"
          className={styles.reposBtn}
        >
          <div className={styles.detailItem}>
            <span className={styles.typeName}>Repositories</span>
            <span className={styles.number}>{user.public_repos}</span>
          </div>
        </a>
      </div>

      <div className={styles.bottomContainer}>
        {/* Sort options */}
        <div className={styles.filters}>
          <div className={styles.sortItem}>
            <label htmlFor="stars">Sort by stars:</label>
            <select
              id="stars"
              value={sortStars}
              onChange={(e) => {
                setSortStars(e.target.value);
                setCurrentPage(1); // Reset to first page when sorting changes
              }}
            >
              <option value="most">Most Stars</option>
              <option value="least">Least Stars</option>
            </select>
          </div>
          <div className={styles.sortItem}>
            <label htmlFor="date">Sort by date:</label>
            <select
              id="date"
              value={sortDate}
              onChange={(e) => {
                setSortDate(e.target.value);
                setCurrentPage(1); // Reset to first page when sorting changes
              }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Display only the current page's sorted repos */}
        <div className={styles.repoContainer}>
          <ul className={styles.repoList}>
            {currentRepos.map((repo) => (
              <a href={repo.html_url} target="_blank" key={repo.id}>
                <li className={styles.repoItem}>
                  <div>
                    <span className={styles.repoName}>{repo.name}</span>
                    <span className={styles.repoStar}>
                      <FaStar />
                      {repo.stargazers_count}
                    </span>
                  </div>
                  <span className={styles.repoDesc}>
                    {repo.description
                      ? repo.description
                      : "Description not available"}
                  </span>
                </li>
              </a>
            ))}
          </ul>
        </div>

        {/* Pagination controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default RepoCard;
