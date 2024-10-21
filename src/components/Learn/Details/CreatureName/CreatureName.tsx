import { FC } from "react";
import styles from "./CreatureName.module.scss";

interface ICreatureNameProps {
    name: string;
    color?: string;
    isPositionRelative?: boolean;
}

const CreatureName: FC<ICreatureNameProps> = (props) => {
    const isPositionRelativeClassName = props.isPositionRelative
        ? styles.positionRelative
        : "";

    return (
        <div
            className={`${styles.nameContainer} ${isPositionRelativeClassName}`}
        >
            <h2 className={styles.avatarName} style={{ color: props.color }}>
                {props.name}
            </h2>
        </div>
    );
};

export default CreatureName;
