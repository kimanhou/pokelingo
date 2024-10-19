import { FC, useEffect, useRef, useState } from "react";
import Steps from "@/components/RoomCreation/Content/Steps/minimalist/Steps";
import Step1 from "@/components/RoomCreation/Content/Join/Step1";
import Step2 from "@/components/RoomCreation/Content/Join/Step2";
import Step3 from "@/components/RoomCreation/Content/Join/Step3";
import Step4 from "@/components/RoomCreation/Content/Join/Step4";
import { JOIN_STEPS } from "./constants";
import { getMemberIdFromLocalStorage } from "@/ts/localStorageUtils";
import styles from "./Join.module.scss";

interface IJoinProps {
    joinRoom: (roomId: string) => void;
    color: string;
    lightColor: string;
}

const Join: FC<IJoinProps> = ({ joinRoom, color, lightColor }: IJoinProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [contentWidth, setContentWidth] = useState<number | undefined>(
        undefined
    );
    const [isReturningUser, setIsReturningUser] = useState(false);
    const joinRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (joinRef) {
            setContentWidth(joinRef.current?.clientWidth);
        }

        const memberId = getMemberIdFromLocalStorage();
        if (memberId) {
            setIsReturningUser(true);
        }
    }, []);

    return (
        <div className={styles.join} ref={joinRef}>
            {isReturningUser && <span>Welcome back</span>}
            <div className={styles.content}>
                <Step1
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
                    color={color}
                    width={contentWidth}
                />
                <Step2
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
                    color={color}
                    width={contentWidth}
                />
                <Step3
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
                    color={color}
                    width={contentWidth}
                />
                <Step4
                    setCurrentStep={setCurrentStep}
                    currentStep={currentStep}
                    color={color}
                    width={contentWidth}
                />
            </div>
            <Steps steps={JOIN_STEPS} currentStep={currentStep} color={color} />
        </div>
    );
};

export default Join;
