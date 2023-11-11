import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import CustomeButton from "../../../../components/shared/CustomeButton/CustomeButton";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <Card title="Enter your phone number" image="phone">
      <div className={styles.inputWrap}>
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.actionButtonWrap}>
        <CustomeButton onHandleClick={() => onNext()} text="Next" />
      </div>
      <p className={styles.bottomPara}>
        By entering your number, you're agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Phone;
