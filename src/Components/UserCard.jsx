import { NavLink } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import styles from "./UserCard.module.css";

import {
  FaGithub,
  FaLocationDot,
  FaXTwitter,
  FaBuilding,
} from "react-icons/fa6";

function formatDate(inputDate) {
  // Split the input into parts: "2023-06-25" -> ["2023", "06", "25"]
  const [year, month, day] = inputDate.split(" ")[0].split("-");

  // Convert month number to short name (e.g., "06" → "Jun")
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthShort = monthNames[parseInt(month) - 1]; // Months are 0-based

  // Return formatted date: "25 Jun 2023"
  return `${parseInt(day)} ${monthShort} ${year}`;
}

function UserCard() {
  const { user } = useUser();

  // If there's no user, don't render anything
  if (!user) return;

  return (
    <div className={styles.userCard}>
      <div className={styles.leftContainer}>
        <img
          className={styles.userAvatar}
          src={user.avatar_url}
          alt="user-avatar-img"
        />
        <p
          className={`${styles.userDescription} ${
            !user.bio ? styles.notAvailable : ""
          }`}
        >
          {user.bio ? user.bio : <em>Description not available</em>}
        </p>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.smallDetails}>
          <div className={styles.names}>
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
          </div>
          <span className={styles.joinDate}>
            Joined {formatDate(user.created_at)}
          </span>
        </div>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.typeName}>Repos</span>
            <span className={styles.number}>{user.public_repos}</span>
            <NavLink to={`/repos/${user.login}`} className={styles.btn}>
              View &gt;
            </NavLink>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.typeName}>Followers</span>
            <span className={styles.number}>{user.followers}</span>
            <NavLink to={`/followers/${user.login}`} className={styles.btn}>
              View &gt;
            </NavLink>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.typeName}>Following</span>
            <span className={styles.number}>{user.following}</span>
            <NavLink to={`/following/${user.login}`} className={styles.btn}>
              View &gt;
            </NavLink>
          </div>
        </div>
        <div className={styles.secondaryDetails}>
          <span
            className={`${styles.location} ${
              !user.location ? styles.notAvailable : ""
            }`}
          >
            <FaLocationDot />
            {user.location ? user.location : <em>Location not available</em>}
          </span>
          <a href={user.html_url} target="_blank" className={styles.github}>
            <FaGithub />
            {user.html_url}
          </a>
          <span
            className={`${styles.twitter} ${
              user.twitter_username ? "" : styles.notAvailable
            }`}
          >
            <FaXTwitter />
            {user.twitter_username ? (
              user.twitter_username
            ) : (
              <em>Not Available</em>
            )}
          </span>
          <span
            className={`${styles.company} ${
              user.company ? "" : styles.notAvailable
            }`}
          >
            <FaBuilding />
            {user.company ? user.company : <em>Not Available</em>}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
