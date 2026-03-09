import { Timer } from "../../components/Timer/Timer";
import styles from "./Home.module.css";
import { pageNames } from "../../constants/pageNames";
import { usePageTitle } from "../../hooks/usePageTitle";

export const Home = () => {
  usePageTitle(pageNames.home);

  return (
    <div className={styles.home}>
      <Timer />
    </div>
  );
};
