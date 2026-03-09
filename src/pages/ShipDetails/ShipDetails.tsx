import { useNavigate, useParams } from "react-router-dom";
import { apiUrlForRocket } from "../../constants/apiUrl";
import type { Ship } from "../../constants/types";
import { useFetch } from "../../hooks/useFetch";
import styles from "./ShipDetails.module.css";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Loading } from "../../components/Loading/Loading";

export const ShipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `${apiUrlForRocket}/ships/${id}`;
  const { data, loading, error } = useFetch<Ship>(url);
  if (error) return <PageNotFound />;

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.details}>
      <div className={styles.detailsCard}>
        <div className={styles.backButton}>
          <button className={styles.button} onClick={() => navigate(-1)}>
            &#8592; GO BACK
          </button>
        </div>
        <div>
          <img
            src={data?.image ?? ""}
            alt={`${data?.name}`}
            className={styles.shipImage}
          />
        </div>
        <div className={styles.info}>
          <h2>{data?.name}</h2>
          <p>TYPE: {data?.type}</p>
          <p>HOME PORT: {data?.home_port}</p>
          <p>STATUS: {data?.active ? "Active" : "Inactive"}</p>
          <p>ROLES: {data?.roles.join(", ")}</p>
          <p>YEAR BUILT: {data?.year_built ?? "Unknown"}</p>
          <p>
            MASS:{" "}
            {data?.mass_kg ? `${data.mass_kg.toLocaleString()} kg` : "Unknown"}
          </p>
          <p>LAUNCHES: {data?.launches.length}</p>
        </div>
      </div>
    </div>
  );
};
