import SearchBar from "../Components/SearchBar";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <h1 className={styles.title}>GitHub Searcher</h1>
      <SearchBar />
      <img
        src="github-mark.svg"
        alt="github-logo"
        className={styles.githubLogo}
      />
    </div>
  );
}

export default Homepage;
