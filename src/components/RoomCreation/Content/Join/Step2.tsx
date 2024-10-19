import { Dispatch, FC, SetStateAction } from "react";
import Input from "@/components/common/Input/Input";

interface IStep2Props {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    currentStep: number;
    color: string;
    width?: number;
}

const Step2: FC<IStep2Props> = (props) => {
    return (
        <div
            className="join-content-step"
            style={{
                minWidth: props.width,
                left: props.width
                    ? -(props.currentStep - 1) * props.width + props.width
                    : 0,
            }}
        >
            Step 2: Enter your name
            <Input
                label="Your name"
                onConfirm={(name: string) => {
                    console.log("your name", name);
                    props.setCurrentStep(3);
                }}
                isRequired
                color={props.color}
            />
        </div>
    );
};

export default Step2;
