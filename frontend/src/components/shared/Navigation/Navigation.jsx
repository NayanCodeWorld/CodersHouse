import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const brandStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };
  const logoText = {
    marginLeft: "10px",
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img className={styles.logo} src="/images/logo.png" alt="CodersHouse" />
        <span style={logoText}>CodersHouse</span>
      </Link>
    </nav>
  );
};

export default Navigation;
