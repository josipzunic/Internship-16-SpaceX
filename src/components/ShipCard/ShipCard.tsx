import type { Ship } from "../../constants/types"
import styles from "./ShipCard.module.css"

interface Props {
    ship: Ship
}

export const ShipCard = ({ship}:Props) => {
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
                </div>
              </div>
    )
}