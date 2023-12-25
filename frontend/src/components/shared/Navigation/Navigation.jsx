import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
import { IoMdLogOut } from "react-icons/io";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

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

  const onHandleLogout = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img className={styles.logo} src="/images/logo.png" alt="CodersHouse" />
        <span style={logoText}>CodersHouse</span>
      </Link>
      <div className={isAuth ? styles.rightSide : styles.rightSideDisaple}>
        <div className={styles.userNameWrapper}>
          <h3>{user?.name}</h3>
          <Link to="/">
            <img
              className={styles.avatarImg}
              src={user?.avatar ? user.avatar : "/images/cool.png"}
              width="40"
              height="40"
              alt={user?.name}
            />
          </Link>
        </div>
        {isAuth && (
          <button className={styles.logoutBtn} onClick={onHandleLogout}>
            <IoMdLogOut />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
