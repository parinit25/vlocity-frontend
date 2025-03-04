import React from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <header className={styles.navbar}>
      <h1 onClick={() => navigate("/")}>Poll App</h1>
      <nav className={styles.navbar__list}>
        <button onClick={() => navigate("/create")}>Create Poll</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
