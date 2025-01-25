import { FC, useState } from "react";
import BottomNotification from "@/components/common/BottomNotification/BottomNotification";
import HomeOption from "@/components/Home/HomeOption";
import learn from "@/assets/study_jigglypuff.png";
import quiz from "@/assets/think_squirtle.png";
import styles from "./Home.module.scss";
import Explanation from "./Explanation";

const Home: FC = (props) => {
    const [isExplanationVisible, setIsExplanationVisible] = useState(true);

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
                <Explanation close={() => setIsExplanationVisible(false)} />
            </BottomNotification>
        </div>
    );
};

export default Home;
