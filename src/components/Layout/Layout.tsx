import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { type ReactNode } from "react";
import styles from "./Layout.module.css";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { lightMode, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  const handleColorMode = () => {
    toggleTheme();
  };

  return (
    <div
      className={`${styles.wrapper} ${isHome ? styles.wrapperHome : ""} ${!lightMode ? styles.wrapperHomeLight : styles.wrapperHomeDark}`}
    >
      <header
        className={`${styles.header} ${!lightMode ? styles.headerLight : styles.headerDark} ${isHome ? styles.headerTransparent : ""}`}
      >
        <h1 className={styles.title} onClick={() => navigate(routes.home)}>
          SPACE X
        </h1>
        <nav className={styles.navbar}>
          <NavLink className={styles.link} to={routes.home}>
            HOME
          </NavLink>
          <NavLink className={styles.link} to={routes.launches}>
            LAUNCHES
          </NavLink>
          <NavLink className={styles.link} to={routes.ships}>
            SHIPS
          </NavLink>
          <label className={styles.switch}>
            <input type="checkbox" onChange={() => handleColorMode()} />
            <span className={styles.slider}></span>
          </label>
        </nav>
      </header>
      <main
        className={`${styles.main} ${!isHome ? (!lightMode ? styles.mainLight : styles.mainDark) : ""}`}
      >
        {children}
      </main>
    </div>
  );
};
