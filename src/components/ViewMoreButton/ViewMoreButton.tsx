import styles from "./ViewMoreButton.module.css"

interface Props {
    textToDisplay: string
}

export const ViewMoreButton = ({textToDisplay}: Props) => {
    return (
    <>
    <div className={styles.buttonContainer}>
        <button className={styles.button}>
          {textToDisplay} <span className={styles.arrow}>&#10230;</span>
        </button>
      </div>
    </>)
}