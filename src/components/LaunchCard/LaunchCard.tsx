import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import type { Launch } from "../../constants/types";
import { ViewMoreButton } from "../ViewMoreButton/ViewMoreButton";
import styles from "./LaunchCard.module.css";
import { useTheme } from "../../hooks/useTheme";

interface Props {
  launch: Launch;
}

export const LaunchCard = ({ launch }: Props) => {
  const date = new Date(launch.date_utc);
  const textToDisplayOnButton = "VIEW MORE";
  const navigate = useNavigate();
  const { lightMode } = useTheme();

  return (
    <div className={!lightMode ? styles.cardLight : styles.cardDark}>
      <div className={styles.cardInfo}>
        <h1 className={styles.title}>{launch.name}</h1>
        <div>
          <p>
            DATE:{" "}
            {`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`}
          </p>
          <p>TIME: {`${date.getUTCHours()}:${date.getUTCMinutes()}`}</p>
        </div>
        <p>
          STATUS:{" "}
          {launch.success === null
            ? "Upcoming"
            : launch.success
              ? "Success"
              : "Failed"}
        </p>
      </div>
      <ViewMoreButton
        textToDisplay={textToDisplayOnButton}
        isHome={false}
        onSelect={() =>
          navigate(routes.launchDetails.replace(":id", launch.id))
        }
      />
    </div>
  );
};
