import styles from "./MissionDescription.module.css"

export const MissionDescription = () => {
  return (
    <>
      <div>
        <h3 className={styles.missionName}>Lorem Ipsum</h3>
      </div>
      <div className={styles.missionDescription}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
          soluta suscipit asperiores veritatis ea, laudantium commodi maiores
          aliquam error provident fugiat, quis sequi dignissimos quia! Quo hic
          veniam dolor incidunt?
        </p>
      </div>
    </>
  );
};
