import { FC, useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer/Footer";
import HomeOption from "@/components/Home/HomeOption";
import logo from "@/assets/logo.svg";
import learn from "@/assets/study_jigglypuff.png";
import quiz from "@/assets/think_squirtle.png";
import { getLastVisit } from "@/ts/localStorageUtils";
import { isBeforeToday } from "@/ts/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useInViewport from "@/hooks/useInViewport";
import { useNavigate } from "react-router-dom";
import styles from "./HomeMobile.module.scss";

interface IHomeMobileProps {
    shouldTriggerMoves: boolean;
}

const HomeMobile: FC<IHomeMobileProps> = (props) => {
    const navigate = useNavigate();
    const undercoverRef = useRef<HTMLDivElement>(null);
    const isUndercoverInViewport = useInViewport(undercoverRef, {
        threshold: 1,
    });
    const [isTouch, setIsTouch] = useState(false);

    const undercoverQuizRef = useRef<HTMLDivElement>(null);
    const isUndercoverQuizInViewport = useInViewport(undercoverQuizRef, {
        threshold: 1,
    });
    const [isTouchQuiz, setIsTouchQuiz] = useState(false);

    const [leftOdd, setLeftOdd] = useState("-50px");
    const [rightEven, setRightEven] = useState("-50px");

    const triggerMoves = () => {
        setTimeout(() => setLeftOdd("0"), 1000);
        setTimeout(() => setLeftOdd("-50px"), 1400);
        setTimeout(() => setRightEven("0"), 2000);
        setTimeout(() => setRightEven("-50px"), 2400);
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
            navigate("/learn");
        }
    }, [isUndercoverInViewport, isTouch]);

    useEffect(() => {
        if (isTouchQuiz && isUndercoverQuizInViewport) {
            navigate("/quiz");
        }
    }, [isUndercoverQuizInViewport, isTouchQuiz]);

    return (
        <div className={styles.homeMobile}>
            <img src={logo} className={styles.logo} />
            <div className={styles.optionsContainer}>
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
                    <div
                        className={styles.optionContent}
                        style={{ left: leftOdd }}
                    >
                        <HomeOption
                            to="/learn"
                            text="Learn"
                            subText="Browse through the list of Pokemon to learn their names"
                            imageUrl={learn}
                        />
                        <div
                            className={styles.undercover}
                            ref={undercoverRef}
                        />
                    </div>
                </div>

                <div
                    className={`${styles.optionContainer} ${styles.reverse}`}
                    onTouchStart={() => setIsTouchQuiz(true)}
                    onTouchEnd={() => setIsTouchQuiz(false)}
                >
                    <div
                        className={styles.optionContent}
                        style={{ right: rightEven }}
                    >
                        <HomeOption
                            to="/quiz"
                            text="Quiz"
                            subText="Once you're ready, test your knowledge"
                            imageUrl={quiz}
                            textFirst
                            secondary
                        />
                        <div
                            className={`${styles.undercover} ${styles.reverse}`}
                            ref={undercoverQuizRef}
                        />
                    </div>
                </div>
                <div className={`${styles.arrowContainer} ${styles.reverse}`}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size="2xl"
                        color="var(--color-logo-light)"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeMobile;
