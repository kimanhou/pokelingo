import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeviceType } from "@/hooks/useMedia";
import { isBeforeToday, isMobile as isMobileFunc } from "@/ts/utils";
import { getLastVisit } from "@/ts/localStorageUtils";
import styles from "./HomeOption.module.scss";

interface IHomeOption {
    text: string;
    subText: string;
    to: string;
    imageUrl: string;
    textFirst?: boolean;
    secondary?: boolean;
    delay?: number;
    shouldTriggerMoves?: boolean;
}

const HomeOption: FC<IHomeOption> = (props) => {
    const [expandableHeight, setExpandableHeight] = useState(0);
    const deviceType = useDeviceType();
    const isMobile = isMobileFunc(deviceType);

    const secondaryClassName = props.secondary ? styles.secondary : "";

    const onMouseOver = () => {
        if (!isMobile) {
            setExpandableHeight(100);
        }
    };

    const onMouseLeave = () => {
        if (!isMobile) {
            setExpandableHeight(0);
        }
    };

    const triggerMoves = () => {
        if (isMobile) return;

        const delay = (props.delay || 0) + 1000;
        setTimeout(() => setExpandableHeight(100), delay);
        setTimeout(() => setExpandableHeight(0), delay + 400);
    };

    useEffect(() => {
        if (props.shouldTriggerMoves && !isMobile) triggerMoves();
    }, [props.shouldTriggerMoves]);

    useEffect(() => {
        if (isMobile) return;

        const lastVisit = getLastVisit();
        if (lastVisit && !isBeforeToday(new Date(lastVisit))) {
            triggerMoves();
        }
    }, []);

    return (
        <Link
            to={props.to}
            className={`${styles.homeOption} ${secondaryClassName}`}
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
