import { FC } from "react";
import Step from "@/components/RoomCreation/Content/Steps/maximalist/Step";
import Line from "@/components/RoomCreation/Content/Steps/maximalist/Line";
import styles from "./Steps.module.scss";

interface IStepsProps {
  steps: any[];
  currentStep: number;
}

const Steps: FC<IStepsProps> = ({ steps, currentStep }: IStepsProps) => {
  return (
    <div className={styles.steps}>
      {steps.map((step) => (
        <>
          <Step key={step.step} {...step} currentStep={currentStep} />
          <Line />
        </>
      ))}
    </div>
  );
};

export default Steps;
