import { routes } from "../../constants/routes";
import type { Ship } from "../../constants/types";
import { ViewMoreButton } from "../ViewMoreButton/ViewMoreButton";
import styles from "./ShipCard.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  ship: Ship;
}

export const ShipCard = ({ ship }: Props) => {
  const textToDisplay = "VIEW MORE";
  const navigate = useNavigate();

  return (
    <div key={ship.id} className={styles.shipCard}>
      <img
        src={ship.image ?? undefined}
        alt={ship.name}
        className={styles.shipImage}
      />
      <div className={styles.shipInfo}>
        <h2 className={styles.shipName}>{ship.name}</h2>
        <p>TYPE: {ship.type}</p>
        <p>HOME PORT: {ship.home_port}</p>
        <p>STATUS: {ship.active ? "Active" : "Inactive"}</p>
        <p>ROLES: {ship.roles.join(", ")}</p>
        <ViewMoreButton
          textToDisplay={textToDisplay}
          isHome={false}
          onSelect={() => navigate(routes.shipDetails.replace(":id", ship.id))}
        />
      </div>
    </div>
  );
};
