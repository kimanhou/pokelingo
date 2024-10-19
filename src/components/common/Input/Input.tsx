import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Input.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IInputProps {
    label: string;
    onConfirm: (value: string) => void;
    isRequired?: boolean;
    minLength?: number;
    color?: string;
}

type UserInputs = {
    inputValue: string;
};

const Input: FC<IInputProps> = ({
    label,
    onConfirm,
    isRequired,
    minLength = 0,
    color,
}: IInputProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserInputs>();

    const onSubmit: SubmitHandler<UserInputs> = (data) => {
        console.log("onSubmit", data.inputValue);
        onConfirm(data.inputValue);
    };

    const isError = errors.inputValue;
    const isErrorClassName = isError ? styles.error : "";

    const inputValue = watch("inputValue");
    const confirmButtonVisibleClassName =
        inputValue?.length >= minLength ? styles.visible : "";

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.input}>
                <input
                    className={`${styles.inputField} ${isErrorClassName}`}
                    value={inputValue || ""}
                    type="text"
                    placeholder=" "
                    style={{ borderColor: color ?? "var(--fg)" }}
                    {...register("inputValue", {
                        required: {
                            value: isRequired || false,
                            message: "This field is required",
                        },
                        minLength: {
                            value: minLength || 0,
                            message: `This field must be at least ${minLength} characters long`,
                        },
                    })}
                />
                <span className={styles.inputLabel}>{label}</span>

                <div
                    className={`${styles.confirmButtonWrapper} ${confirmButtonVisibleClassName}`}
                >
                    <button
                        className={`${styles.confirmButton} ${confirmButtonVisibleClassName}`}
                        style={{ background: color ?? "var(--fg)" }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={styles.icon}
                        />
                    </button>
                </div>
            </label>
            {isError && (
                <span className={styles.errorMessage}>
                    {errors.inputValue?.message}
                </span>
            )}
        </form>
    );
};

export default Input;
