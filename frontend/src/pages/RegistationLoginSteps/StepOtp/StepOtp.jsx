import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import CustomeButton from "../../../components/shared/CustomeButton/CustomeButton";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const { phoneNumber, hash } = useSelector((state) => state.auth.otp);

  const submitOtp = async () => {
    try {
      if (!otp || !phoneNumber || !hash) return;
      const { data } = await verifyOtp({ otp, phoneNumber, hash });
      //console.log(data);
      dispatch(setAuth(data));
      onNext();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the code we just texted you" image="lock">
        <div className={styles.inputWrap}>
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
        </div>
        <div className={styles.actionButtonWrap}>
          <CustomeButton onHandleClick={() => submitOtp()} text="Next" />
        </div>
        <p className={styles.bottomPara}>Didn’t receive? Tap to resend</p>
      </Card>
    </div>
  );
};

export default StepOtp;
