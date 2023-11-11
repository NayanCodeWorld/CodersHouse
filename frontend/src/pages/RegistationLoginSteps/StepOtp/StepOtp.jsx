import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import CustomeButton from "../../../components/shared/CustomeButton/CustomeButton";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the code we just texted you" image="lock">
        <div className={styles.inputWrap}>
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
        </div>
        <div className={styles.actionButtonWrap}>
          <CustomeButton onHandleClick={() => onNext()} text="Next" />
        </div>
        <p className={styles.bottomPara}>Didn’t receive? Tap to resend</p>
      </Card>
    </div>
  );
};

export default StepOtp;
