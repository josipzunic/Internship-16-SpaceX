import { NavLink } from "react-router-dom";
import { routes } from "../../constants/routes";
import { useState, type ReactNode } from "react";
import styles from "./Layout.module.css";
import { useLocation } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [lightMode, setMode] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleColorMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.checked);
  };

  return (
    <div className={`${styles.wrapper} ${isHome ? styles.wrapperHome : ""}`}>
      <header
        className={`${styles.header} ${lightMode ? styles.headerLight : styles.headerDark} ${isHome ? styles.headerTransparent : ""}`}
      >
        <h1 className={styles.title}>SPACE X</h1>
        <nav className={styles.navbar}>
          <NavLink className={styles.link} to={routes.home}>
            HOME
          </NavLink>
          <NavLink className={styles.link} to={routes.launches}>
            LAUNCHES
          </NavLink>
          <label className={styles.switch}>
            <input
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleColorMode(e)
              }
            />
            <span className={styles.slider}></span>
          </label>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
