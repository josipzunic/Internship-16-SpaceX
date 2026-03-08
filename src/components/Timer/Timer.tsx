import { useState, useEffect } from "react";
import styles from "./Timer.module.css";
import { MissionDescription } from "../MissionDescription/MissionDescription";
import { ViewMoreButton } from "../ViewMoreButton/ViewMoreButton";

export const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(10000);
  const textToDisplayOnButton = "VIEW LAUNCH"

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={styles.timer}>
      <div>
        <h2 className={styles.title}>Upcoming Launch: </h2>
      </div>
      <MissionDescription />
      <div className={styles.countdown}>
        <div className={styles.timerItem}>
          <p className={styles.timerValue}>{pad(days)}</p>
          <p className={styles.timerText}>DAYS</p>
        </div>
        <div className={styles.timerItem}>
          <p className={styles.timerValue}>{pad(hours)}</p>
          <p className={styles.timerText}>HOURS</p>
        </div>
        <div className={styles.timerItem}>
          <p className={styles.timerValue}>{pad(minutes)}</p>
          <p className={styles.timerText}>MINUTES</p>
        </div>
        <div className={styles.timerItem}>
          <p className={styles.timerValue}>{pad(seconds)}</p>
          <p className={styles.timerText}>SECONDS</p>
        </div>
      </div>
      <ViewMoreButton textToDisplay={textToDisplayOnButton} />
    </div>
  );
};
