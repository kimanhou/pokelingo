import { FC } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Step.module.scss";

interface IStepProps {
  step: number;
  currentStep: number;
  label: string;
  icon: IconDefinition;
}

const Step: FC<IStepProps> = ({
  step,
  currentStep,
  label,
  icon,
}: IStepProps) => {
  const isCurrent = currentStep === step;
  const isCurrentClassName = isCurrent ? styles.current : "";
  return (
    <div className={`${styles.step} ${isCurrentClassName}`}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} />
      </div>
      {label}
    </div>
  );
};

export default Step;
