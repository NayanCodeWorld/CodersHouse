import React from "react";
import { FaArrowRight } from "react-icons/fa";
import style from "./Button.module.css";

const Button = ({ text, onHandleClick }) => {
  return (
    <button onClick={onHandleClick} className={style.button}>
      <span>{text}</span>
      <FaArrowRight />
    </button>
  );
};

export default Button;
