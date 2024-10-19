import { FC, useState } from "react";
import Steps from "@/components/RoomCreation/Content/Steps/minimalist/Steps";
import { CREATE_STEPS } from "./constants";
import styles from "./Create.module.scss";

interface ICreateProps {
  createRoom: (roomId: string) => void;
  color: string;
  lightColor: string;
}

const Create: FC<ICreateProps> = ({
  createRoom,
  color,
  lightColor,
}: ICreateProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className={styles.create}>
      <div className={styles.content}></div>
      <Steps steps={CREATE_STEPS} currentStep={currentStep} color={color} />
    </div>
  );
};

export default Create;
