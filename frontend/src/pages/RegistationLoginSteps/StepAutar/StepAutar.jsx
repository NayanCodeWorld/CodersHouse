import React, { useEffect, useState } from "react";
import Card from "../../../components/shared/Card/Card";
import CustomeButton from "../../../components/shared/CustomeButton/CustomeButton";
import Loader from "../../../components/shared/Loader/Loader";
import styles from "./StepAutar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../../store/userDetailSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";

const StepAutar = () => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.userDetails);
  const [image, setImage] = useState("/images/logo.png");

  const [loading, setLoading] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  const captureImage = (e) => {
    const myFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(myFile);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const submitAvatar = async () => {
    if (!name || !avatar) return;
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        if (unmounted) {
          dispatch(setAuth(data));
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setUnmounted(true);
    };
  }, []);

  if (loading) return <Loader message="Activation in progress..." />;

  return (
    <div className={styles.cardWrapper}>
      <Card title={`Okay, ${name}`} image="monkey">
        <p className={styles.subHeading}>How's this photo</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImg} src={image} alt="Avatar" />
        </div>
        <div>
          <input
            id="avatarId"
            className={styles.avatarInput}
            type="file"
            onChange={captureImage}
          />
          <label className={styles.avatarInputLabel} htmlFor="avatarId">
            Choose a different photo
          </label>
        </div>
        <div className={styles.actionButtonWrap}>
          <CustomeButton onHandleClick={() => submitAvatar()} text="Next" />
        </div>
      </Card>
    </div>
  );
};

export default StepAutar;
