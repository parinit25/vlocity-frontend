import React from "react";
import { Outlet } from "react-router";
import styles from "./ProtectedLayout.module.scss";
import Header from "../components/header/Header";

const ProtectedLayout = () => {
  return (
    <div>
      <Header />
      <main className={styles.main_body}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
