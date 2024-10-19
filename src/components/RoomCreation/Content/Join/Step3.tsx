import { Dispatch, FC, SetStateAction } from "react";

interface IStep3Props {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    currentStep: number;
    color: string;
    width?: number;
}

const Step3: FC<IStep3Props> = (props) => {
    return (
        <div
            className="join-content-step"
            style={{
                minWidth: props.width,
                left: props.width
                    ? -(props.currentStep - 1) * props.width + 2 * props.width
                    : 0,
            }}
        >
            Step 3: Choose your avatar
            <button onClick={() => props.setCurrentStep(4)}>Go step 4</button>
        </div>
    );
};

export default Step3;
