import React, { useState } from "react";
import styles from "./Register.module.css";
import StepPhoneEmail from "../RegistationLoginSteps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../RegistationLoginSteps/StepOtp/StepOtp";
import StepName from "../RegistationLoginSteps/StepName/StepName";
import StepAutar from "../RegistationLoginSteps/StepAutar/StepAutar";
import StepUsername from "../RegistationLoginSteps/StepUsername/StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAutar,
  5: StepUsername,
};

Object.freeze(steps);

const Register = () => {
  const [step, setStep] = useState(1);
  const CurrentStep = steps[step];

  const onHanldeStep = () => setStep(step + 1);

  return <CurrentStep onNext={onHanldeStep} />; // CurrentStep is a variable here
};

export default Register;
