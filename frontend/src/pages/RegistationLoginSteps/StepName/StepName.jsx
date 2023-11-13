import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import CustomeButton from "../../../components/shared/CustomeButton/CustomeButton";
import styles from "./StepName.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/userDetailSlice";

const StepName = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.userDetails);

  const [fullName, setFullName] = useState(name);

  const submitFullName = () => {
    if (!fullName) {
      return;
    }
    dispatch(setName(fullName));
    onNext();
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title="What's your full name?" image="happy">
        <div className={styles.inputWrap}>
          <TextInput
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <p className={styles.bottomPara}>
          People use real names at codershouse :) !
        </p>
        <div className={styles.actionButtonWrap}>
          <CustomeButton onHandleClick={() => submitFullName()} text="Next" />
        </div>
      </Card>
    </div>
  );
};

export default StepName;
