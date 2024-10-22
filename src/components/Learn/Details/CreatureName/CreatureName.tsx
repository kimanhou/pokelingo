import { FC } from "react";
import styles from "./CreatureName.module.scss";

interface ICreatureNameProps {
    name: string;
    color?: string;
    isPositionRelative?: boolean;
    isAlignCenter?: boolean;
    isFontSizeXl?: boolean;
}

const CreatureName: FC<ICreatureNameProps> = (props) => {
    const isPositionRelativeClassName = props.isPositionRelative
        ? styles.positionRelative
        : "";

    const alignCenterClassName = props.isAlignCenter ? styles.alignCenter : "";
    const fontSizeXlClassName = props.isFontSizeXl ? styles.fontSizeXl : "";

    return (
        <div
            className={`${styles.nameContainer} ${isPositionRelativeClassName} ${alignCenterClassName} ${fontSizeXlClassName}`}
        >
            <h2 className={styles.avatarName} style={{ color: props.color }}>
                {props.name}
            </h2>
        </div>
    );
};

export default CreatureName;
