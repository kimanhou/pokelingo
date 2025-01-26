import { FC, useEffect, useState } from "react";
import BottomNotification from "@/components/common/BottomNotification/BottomNotification";
import Explanation from "@/components/Home/Explanation";
import HomeOption from "@/components/Home/HomeOption";
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
            <div className={styles.optionsContainer}>
                <HomeOption to="/learn" text="Learn" imageUrl={learn} />
                <HomeOption to="/quiz" text="Quiz" imageUrl={quiz} />
            </div>

            <BottomNotification
                isVisible={isExplanationVisible}
                setIsVisible={setIsExplanationVisible}
                backgroundColor="var(--color-logo-light)"
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
