import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrlForLaunch, apiUrlForRocket } from "../../constants/apiUrl";
import type { Launch, Rocket } from "../../constants/types";
import { useFetch } from "../../hooks/useFetch";
import styles from "./LaunchDetails.module.css";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Loading } from "../../components/Loading/Loading";

export const LaunchDetails = () => {
  const { id } = useParams();
  const urlForLaunch = `${apiUrlForLaunch}/launches/${id}`;
  const navigate = useNavigate();

  const {
    data: dataLaunch,
    loading: launchLoading,
    error: launchError,
  } = useFetch<Launch>(urlForLaunch);

  const urlForRocket = dataLaunch?.rocket
    ? `${apiUrlForRocket}/rockets/${dataLaunch.rocket}`
    : null;

  const { data: dataRocket } = useFetch<Rocket>(urlForRocket);
  const date = new Date(dataLaunch?.date_utc ?? "");

  if (launchError) return <PageNotFound />;

  return launchLoading ? (
    <Loading />
  ) : (
    <div className={styles.details}>
      <div className={styles.detailsCard}>
        <div className={styles.backButton}>
          <button className={styles.button} onClick={() => navigate(-1)}>
            {" "}
            &#8592; GO BACK
          </button>
        </div>
        <div>
          <img
            src={dataLaunch?.links.patch.large}
            alt={`${dataLaunch?.name} emblem`}
            className={styles.emblem}
          />
        </div>
        <div className={styles.info}>
          <h2>{dataLaunch?.name}</h2>
          <div>
            <p>
              DATE:{" "}
              {`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`}
            </p>
            <p>TIME: {`${date.getUTCHours()}:${date.getUTCMinutes()}`}</p>
          </div>
          <p>ROCKET: {dataRocket?.name}</p>
          {dataLaunch?.failures.length !== 0 ? (
            dataLaunch?.failures.map((failure, index) => (
              <p key={index}>FAIL: {failure.reason}</p>
            ))
          ) : (
            <p>FAIL: none</p>
          )}
          <p>
            LINK:{" "}
            <Link
              to={`https://www.youtube.com/watch?v=${dataLaunch?.links.youtube_id}`}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {dataLaunch?.name}&#8599;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
