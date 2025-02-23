import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import useScreenSize from "../Hooks/useScreenSize";
import styles from "./FollowerCard.module.css";
import Pagination from "../Utils/Pagination";

function FollowerCard() {
  const { user, followers } = useUser();
  const { isMobile, isTablet } = useScreenSize();

  // Track current page
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive followers per page
  const followersPerPage = isMobile ? 4 : isTablet ? 6 : 9;

  // Calculate total pages based on sorted Followers
  const totalPages = Math.ceil(followers.length / followersPerPage);

  // Slice the sorted Followers array based on the current page
  const startIndex = (currentPage - 1) * followersPerPage;
  const endIndex = startIndex + followersPerPage;
  const currentFollowers = followers.slice(startIndex, endIndex);

  // Update current page when user clicks 'Next' or 'Previous'
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // Reset page when screen size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [followersPerPage]);

  // If there's no user, don't render anything
  if (!user) return;

  return (
    <div className={styles.followerCard}>
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
          href={`https://github.com/${user.login}?tab=followers`}
          target="_blank"
          className={styles.followersBtn}
        >
          <div className={styles.detailItem}>
            <span className={styles.typeName}>Followers</span>
            <span className={styles.number}>{user.followers}</span>
          </div>
        </a>
      </div>

      <div className={styles.bottomContainer}>
        {/* Display only the current page's  Followers */}
        <div className={styles.followerContainer}>
          <ul className={styles.followerList}>
            {currentFollowers.map((follower) => (
              <NavLink to={`/profile/${follower.login}`} key={follower.id}>
                <li className={styles.followerItem}>
                  <img
                    src={follower.avatar_url}
                    alt="user-avatar-img"
                    className={styles.userAvatarMini}
                  />
                  <span className={styles.followerFullName}>
                    {follower.login}
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

export default FollowerCard;
