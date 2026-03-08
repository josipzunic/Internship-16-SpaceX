import { Timer } from "../../components/Timer/Timer";
import styles from "./Home.module.css"

export const Home = () => {
  return (
    <div className={styles.home}>
      <Timer />
    </div>
  );
};
