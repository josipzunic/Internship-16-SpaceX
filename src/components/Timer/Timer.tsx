import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

export const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(10000);

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
      <div className={styles.timerItem}>
        <p>{pad(days)}</p>
        <p>days</p>
      </div>
      <div className={styles.timerItem}>
        <p>{pad(hours)}</p>
        <p>hours</p>
      </div>
      <div className={styles.timerItem}>
        <p>{pad(minutes)}</p>
        <p>minutes</p>
      </div>
      <div className={styles.timerItem}>
        <p>{pad(seconds)}</p>
        <p>seconds</p>
      </div>
    </div>
  );
};
