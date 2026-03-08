import { useEffect } from "react";
import { Timer } from "../../components/Timer/Timer";
import styles from "./Home.module.css";
import { pageNames } from "../../constants/pageNames";

export const Home = () => {
  useEffect(() => {
    document.title = pageNames.home;
  }, []);
  
  return (
    <div className={styles.home}>
      <Timer />
    </div>
  );
};
