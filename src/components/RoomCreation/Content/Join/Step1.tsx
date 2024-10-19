import { Dispatch, FC, SetStateAction } from "react";
import Input from "@/components/common/Input/Input";

interface IStep1Props {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    currentStep: number;
    color: string;
    width?: number;
}

const Step1: FC<IStep1Props> = (props) => {
    return (
        <div
            className="join-content-step"
            style={{
                minWidth: props.width,
                left: props.width ? -(props.currentStep - 1) * props.width : 0,
            }}
        >
            Step 1: Enter the room id
            <Input
                label="Room id"
                onConfirm={(roomId: string) => {
                    console.log("Join room id", roomId);
                    props.setCurrentStep(2);
                }}
                isRequired
                color={props.color}
            />
        </div>
    );
};

export default Step1;
