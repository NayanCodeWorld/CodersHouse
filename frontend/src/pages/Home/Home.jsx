import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "../../components/shared/Card/Card";
import CustomeButton from "../../components/shared/CustomeButton/CustomeButton";

const Home = () => {
  const navigate = useNavigate();

  const signInLinkStyle = {
    color: "0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to CodersHouse!" image="hello">
        <p className={styles.text}>
          We're working hard to get codersHouse ready for everyone! While we
          wrap up the finishing youches, we're adding people gradually to make
          sure nothing breaks
        </p>
        <CustomeButton
          onHandleClick={() => navigate("/authenicate")}
          text="Let's Go"
        />
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          {/* <Link to="/login" style={signInLinkStyle}>
            Sign in
          </Link> */}
        </div>
      </Card>
    </div>
  );
};

export default Home;
