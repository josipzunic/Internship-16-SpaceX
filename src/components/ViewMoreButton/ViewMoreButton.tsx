import styles from "./ViewMoreButton.module.css";

interface Props {
  textToDisplay: string;
  isHome: boolean;
}

export const ViewMoreButton = ({ textToDisplay, isHome }: Props) => {
  return (
    <>
      <div className={styles.buttonContainer}>
        <button className={isHome ? styles.button : styles.buttonSpecial}>
          {textToDisplay} <span className={styles.arrow}>&#10230;</span>
        </button>
      </div>
    </>
  );
};
