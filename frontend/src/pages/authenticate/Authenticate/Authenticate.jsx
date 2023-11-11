import React, { useState } from "react";
import StepPhoneEmail from "../../RegistationLoginSteps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../../RegistationLoginSteps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authentcate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onHanldeNext = () => setStep(step + 1);

  return <Step onNext={onHanldeNext} />;
};

export default Authentcate;
