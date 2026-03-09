import styles from "./MissionDescription.module.css";

export const MissionDescription = () => {
  return (
    <>
      <div>
        <h3 className={styles.missionName}>There is none</h3>
      </div>
      <div className={styles.missionDescription}>
        <p>
          The API has not been updates since 2012. So I have made a countdown
          which counts down from 10000 seconds to satisfy this part of the task.
          Thus, the button is hardcoded to lead you to the Launch page. My apologies.
        </p>
      </div>
    </>
  );
};
