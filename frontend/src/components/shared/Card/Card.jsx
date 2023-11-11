import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, image, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        <img className={styles.img} src={`/images/${image}.png`} alt={image} />
        <h1 className={styles.heading}>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
