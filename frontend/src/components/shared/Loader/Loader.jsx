import React from "react";
import Card from "../Card/Card";
import styles from "./Loader.module.css";
import { RotatingLines } from "react-loader-spinner";

const Loader = ({ message }) => {
  return (
    <div className={styles.cardWrapper}>
      <Card>
        <div className={styles.loader}>
          <span className={styles.message}>{message}</span>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
        </div>
      </Card>
    </div>
  );
};

export default Loader;
