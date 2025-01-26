import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HomeOption.module.scss";

interface IHomeOption {
    text: string;
    subText: string;
    to: string;
    imageUrl: string;
    textFirst?: boolean;
}

const HomeOption: FC<IHomeOption> = (props) => {
    const [expandableHeight, setExpandableHeight] = useState(0);

    const onMouseOver = () => {
        setExpandableHeight(100);
    };

    const onMouseLeave = () => {
        setExpandableHeight(0);
    };

    return (
        <Link
            to={props.to}
            className={styles.homeOption}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            {!props.textFirst && (
                <>
                    <div
                        className={styles.expandable}
                        style={{ height: expandableHeight }}
                    ></div>
                    <div
                        className={styles.imageContainer}
                        style={{
                            backgroundImage: `url(${props.imageUrl})`,
                        }}
                    ></div>
                    <h2>{props.text}</h2>
                    <p>{props.subText}</p>
                </>
            )}

            {props.textFirst && (
                <>
                    <h2>{props.text}</h2>
                    <p>{props.subText}</p>
                    <div
                        className={styles.imageContainer}
                        style={{
                            backgroundImage: `url(${props.imageUrl})`,
                        }}
                    ></div>
                    <div
                        className={styles.expandable}
                        style={{ height: expandableHeight }}
                    ></div>
                </>
            )}
        </Link>
    );
};

export default HomeOption;
