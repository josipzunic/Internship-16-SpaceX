import styles from "./ViewMoreButton.module.css";

interface Props {
  textToDisplay: string;
  isHome: boolean;
  onSelect: () => void
}

export const ViewMoreButton = ({ textToDisplay, isHome, onSelect }: Props) => {
  return (
    <>
      <div className={styles.buttonContainer}>
        <button className={isHome ? styles.button : styles.buttonSpecial} onClick={onSelect}>
          {textToDisplay} <span className={styles.arrow}>&#10230;</span>
        </button>
      </div>
    </>
  );
};
