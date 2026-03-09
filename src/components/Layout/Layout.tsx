import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { useState, type ReactNode } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`${styles.wrapper} ${isHome ? styles.wrapperHome : ""} ${lightMode ? styles.wrapperHomeLight : styles.wrapperHomeDark}`}
    >
      <header
        className={`${styles.header} ${lightMode ? styles.headerLight : styles.headerDark} ${isHome ? styles.headerTransparent : ""}`}
      >
        <h1 className={styles.title} onClick={() => navigate(routes.home)}>
          SPACE X
        </h1>
        <nav className={styles.navbar}>
          <label className={styles.hamburger} htmlFor="navbar-toggle">
            <div
              className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`}
            />
            <div
              className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`}
            />
          </label>
          <input
            type="checkbox"
            id="navbar-toggle"
            className={styles.navToggle}
            checked={menuOpen}
            onChange={() => setMenuOpen(!menuOpen)}
          />
          <div
            className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}
          >
            <NavLink
              className={styles.link}
              to={routes.home}
              onClick={() => setMenuOpen(false)}
            >
              HOME
            </NavLink>
            <NavLink
              className={styles.link}
              to={routes.launches}
              onClick={() => setMenuOpen(false)}
            >
              LAUNCHES
            </NavLink>
            <NavLink
              className={styles.link}
              to={routes.ships}
              onClick={() => setMenuOpen(false)}
            >
              SHIPS
            </NavLink>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={!lightMode}
                onChange={toggleTheme}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </nav>
      </header>
      <main
        className={`${styles.main} ${!isHome ? (lightMode ? styles.mainLight : styles.mainDark) : ""}`}
      >
        {children}
      </main>
    </div>
  );
};
