import { FC, useEffect, useRef, useState } from "react";
import HomeOption from "@/components/Home/HomeOption";
import { getLastVisit } from "@/ts/localStorageUtils";
import { isBeforeToday } from "@/ts/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useInViewport from "@/hooks/useInViewport";
import { useNavigate } from "react-router-dom";
import styles from "./HomeMobileOption.module.scss";

interface IHomeMobileOptionProps {
    shouldTriggerMoves: boolean;
    to: string;
    text: string;
    subText: string;
    imageUrl: string;
}

const HomeMobileOption: FC<IHomeMobileOptionProps> = (props) => {
    const navigate = useNavigate();
    const undercoverRef = useRef<HTMLDivElement>(null);
    const isUndercoverInViewport = useInViewport(undercoverRef, {
        threshold: 1,
    });
    const [isTouch, setIsTouch] = useState(false);
    const [leftOdd, setLeftOdd] = useState("-50px");

    const triggerMoves = () => {
        setTimeout(() => setLeftOdd("0"), 1000);
        setTimeout(() => setLeftOdd("-50px"), 1400);
    };

    useEffect(() => {
        if (props.shouldTriggerMoves) triggerMoves();
    }, [props.shouldTriggerMoves]);

    useEffect(() => {
        const lastVisit = getLastVisit();
        if (lastVisit && !isBeforeToday(new Date(lastVisit))) {
            triggerMoves();
        }
    }, []);

    useEffect(() => {
        if (isTouch && isUndercoverInViewport) {
            navigate(props.to);
        }
    }, [isUndercoverInViewport, isTouch]);

    return (
        <>
            <div className={styles.arrowContainer}>
                <FontAwesomeIcon
                    icon={faArrowRight}
                    size="2xl"
                    color="var(--bg)"
                />
            </div>
            <div
                className={styles.optionContainer}
                onTouchStart={() => setIsTouch(true)}
                onTouchEnd={() => setIsTouch(false)}
            >
                <div className={styles.optionContent} style={{ left: leftOdd }}>
                    <HomeOption
                        to={props.to}
                        text={props.text}
                        subText={props.subText}
                        imageUrl={props.imageUrl}
                    />
                    <div className={styles.undercover} ref={undercoverRef} />
                </div>
            </div>
        </>
    );
};

export default HomeMobileOption;
