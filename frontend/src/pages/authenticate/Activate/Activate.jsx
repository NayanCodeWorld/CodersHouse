import React, { useState } from "react";
import StepAutar from "../../RegistationLoginSteps/StepAutar/StepAutar";
import StepName from "../../RegistationLoginSteps/StepName/StepName";

const steps = {
  1: StepName,
  2: StepAutar,
};

const Activate = ({ onNext }) => {
  const [step, setStep] = useState(1);
  const CurrentSteps = steps[step];

  const onHanldeNext = () => setStep(step + 1);

  return <CurrentSteps onNext={onHanldeNext} />;
};

export default Activate;
