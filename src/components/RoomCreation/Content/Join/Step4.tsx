import { Dispatch, FC, SetStateAction } from "react";

interface IStep4Props {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    currentStep: number;
    color: string;
    width?: number;
}

const Step4: FC<IStep4Props> = (props) => {
    return (
        <div
            className="join-content-step"
            style={{
                minWidth: props.width,
                left: props.width
                    ? -(props.currentStep - 1) * props.width + 3 * props.width
                    : 0,
            }}
        >
            Step 4: Confirm & join room
            <button onClick={() => props.setCurrentStep(5)}>Go step 5</button>
        </div>
    );
};

export default Step4;
