import { FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";

interface IButtonProps {
    onClick: () => void;
    text: string;
    disabled?: boolean;
    secondary?: boolean;
    selected?: boolean;
    icon?: IconProp;
    backgroundColor?: string;
    shrink?: boolean;
    expand?: boolean;
    className?: string;
}

const Button: FC<IButtonProps> = ({
    onClick,
    text,
    disabled,
    secondary,
    selected,
    icon,
    backgroundColor,
    shrink,
    expand,
    className,
}: IButtonProps) => {
    const secondaryClassName = secondary ? styles.secondary : "";
    const selectedClassName = selected ? styles.selected : "";
    const iconColor = backgroundColor ? "var(--bg)" : "var(--fg)";

    const mainColorClassName = backgroundColor
        ? `color-${backgroundColor.slice(1).toLowerCase()}`
        : "";
    const hasBackgroundColorClassName = backgroundColor
        ? `${styles.hasBackgroundColor} ${styles[mainColorClassName]}`
        : "";

    const shrinkClassName = shrink ? styles.shrink : "";
    const expandClassName = expand ? styles.expand : "";

    return (
        <button
            className={`${styles.button} ${secondaryClassName} ${selectedClassName} ${hasBackgroundColorClassName} ${shrinkClassName} ${expandClassName} ${className}`}
            onClick={onClick}
            disabled={disabled}
            style={{ backgroundColor }}
        >
            {icon && <FontAwesomeIcon icon={icon} color={iconColor} />}
            {text}
        </button>
    );
};

export default Button;
