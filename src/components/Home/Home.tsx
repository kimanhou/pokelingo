import { FC, useEffect, useState } from "react";
import BottomNotification from "@/components/common/BottomNotification/BottomNotification";
import Explanation from "@/components/Home/Explanation";
import HomeOption from "@/components/Home/HomeOption";
import logo from "@/assets/logo.svg";
import learn from "@/assets/study_jigglypuff.png";
import quiz from "@/assets/think_squirtle.png";
import { getLastVisit, setLastVisit } from "@/ts/localStorageUtils";
import { isBeforeToday } from "@/ts/utils";
import styles from "./Home.module.scss";

const Home: FC = (props) => {
    const [isExplanationVisible, setIsExplanationVisible] = useState(false);
    const [isExplanationLoaded, setIsExplanationLoaded] = useState(false);

    useEffect(() => {
        const lastVisit = getLastVisit();
        if (
            isExplanationLoaded &&
            (!lastVisit || isBeforeToday(new Date(lastVisit)))
        ) {
            setIsExplanationVisible(true);
            setLastVisit(new Date());
        }
    }, [isExplanationLoaded]);

    return (
        <div className={styles.home}>
            <img src={logo} className={styles.logo} />
            <div className={styles.optionsContainer}>
                <div className={styles.optionContainer}>
                    <div className={styles.placeholder}></div>
                    <HomeOption
                        to="/learn"
                        text="Learn"
                        subText="Browse through the list of Pokemon to learn their names"
                        imageUrl={learn}
                    />
                </div>

                <div className={styles.optionContainer}>
                    <HomeOption
                        to="/quiz"
                        text="Quiz"
                        subText="Once you're ready, test your knowledge"
                        imageUrl={quiz}
                        textFirst
                    />
                    <div className={styles.placeholder}></div>
                </div>
            </div>

            <BottomNotification
                isVisible={isExplanationVisible}
                setIsVisible={setIsExplanationVisible}
                backgroundColor="var(--color-logo-light)"
                withBackdrop
            >
                <Explanation
                    close={() => setIsExplanationVisible(false)}
                    setIsLoaded={setIsExplanationLoaded}
                />
            </BottomNotification>
        </div>
    );
};

export default Home;
