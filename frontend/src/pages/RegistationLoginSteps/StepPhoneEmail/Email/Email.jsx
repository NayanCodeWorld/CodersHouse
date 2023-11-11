import React, { useState } from "react";

import Card from "../../../../components/shared/Card/Card";
import CustomeButton from "../../../../components/shared/CustomeButton/CustomeButton";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Email = ({ onNext }) => {
  const [email, setEmail] = useState("");
  return (
    <Card title="Enter your email id" image="Vector">
      <div className={styles.inputWrap}>
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={styles.actionButtonWrap}>
        <CustomeButton onHandleClick={() => onNext()} text="Next" />
      </div>
      <p className={styles.bottomPara}>
        By entering your email, you're agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Email;
