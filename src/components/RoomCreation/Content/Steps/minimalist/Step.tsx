import { FC } from "react";
import styles from "./Step.module.scss";

interface IStepProps {
  step: number;
  currentStep: number;
  color?: string;
}

const Step: FC<IStepProps> = ({ step, currentStep, color }: IStepProps) => {
  const isDone = currentStep >= step;
  const isDoneClassName = isDone ? styles.done : "";
  return (
    <div
      className={`${styles.step} ${isDoneClassName}`}
      style={{ backgroundColor: isDone ? color : undefined }}
    ></div>
  );
};

export default Step;
