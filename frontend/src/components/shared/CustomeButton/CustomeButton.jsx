import React from "react";
import { FaArrowRight } from "react-icons/fa";
import style from "./CustomeButton.module.css";

const CustomeButton = ({ text, onHandleClick }) => {
  return (
    <button onClick={onHandleClick} className={style.button}>
      <span>{text}</span>
      <FaArrowRight />
    </button>
  );
};

export default CustomeButton;
