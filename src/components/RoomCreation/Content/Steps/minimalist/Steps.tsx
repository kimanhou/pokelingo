import { FC } from "react";
import Step from "@/components/RoomCreation/Content/Steps/minimalist/Step";
import styles from "./Steps.module.scss";

interface IStepsProps {
  steps: any[];
  currentStep: number;
  color?: string;
}

const Steps: FC<IStepsProps> = ({ steps, currentStep, color }: IStepsProps) => {
  return (
    <div className={styles.steps}>
      {steps.map((step) => (
        <Step
          key={step.step}
          {...step}
          currentStep={currentStep}
          color={color}
        />
      ))}
    </div>
  );
};

export default Steps;
