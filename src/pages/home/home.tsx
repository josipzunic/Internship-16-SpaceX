import { Timer } from "../../components/Timer/Timer";
import styles from "./Home.module.css";
import { pageNames } from "../../constants/pageNames";
import { withPageTitle } from "../../hocs/withPageTitle";

export const Home = () => {
  return (
    <div className={styles.home}>
      <Timer />
    </div>
  );
};

export const HomeWithTitle = withPageTitle(Home, pageNames.home);
