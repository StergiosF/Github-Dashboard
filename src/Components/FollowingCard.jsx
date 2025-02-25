import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../Context/UserContext";
import useScreenSize from "../Hooks/useScreenSize";
import styles from "./FollowingCard.module.css";
import Pagination from "../Utils/Pagination";

function FollowingCard() {
  const { user, following } = useUser();
  const { isMobile, isTablet } = useScreenSize();

  // Track current page
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive followers per page
  const followingPerPage = isMobile ? 4 : isTablet ? 6 : 9;

  // Calculate total pages based on sorted Following
  const totalPages = Math.ceil(following.length / followingPerPage);

  // Slice the sorted Following array based on the current page
  const startIndex = (currentPage - 1) * followingPerPage;
  const endIndex = startIndex + followingPerPage;
  const currentFollowing = following.slice(startIndex, endIndex);

  // Update current page when user clicks 'Next' or 'Previous'
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // If there's no user, don't render anything
  if (!user) return;

  return (
    <div className={styles.followingCard}>
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
          href={`https://github.com/${user.login}?tab=following`}
          target="_blank"
          className={styles.followingBtn}
        >
          <div className={styles.detailItem}>
            <span className={styles.typeName}>Following</span>
            <span className={styles.number}>{user.following}</span>
          </div>
        </a>
      </div>

      <div className={styles.bottomContainer}>
        {/* Display only the current page's  Following */}
        <div className={styles.followingContainer}>
          <ul className={styles.followingList}>
            {currentFollowing.map((following) => (
              <NavLink to={`/profile/${following.login}`} key={following.id}>
                <li className={styles.followingItem}>
                  <img
                    src={following.avatar_url}
                    alt="user-avatar-img"
                    className={styles.userAvatarMini}
                  />
                  <span className={styles.followingFullName}>
                    {following.login}
                  </span>
                </li>
              </NavLink>
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

export default FollowingCard;
