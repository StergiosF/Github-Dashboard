import { useUser } from "../Context/UserContext";
import styles from "./ErrorMessage.module.css";

function ErrorMessage() {
  const { error } = useUser();

  return <h1 className={styles.error}>{error}</h1>;
}

export default ErrorMessage;
