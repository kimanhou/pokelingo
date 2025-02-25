import { FC } from "react";
import HomeMobileOption from "./HomeMobileOption";
import Footer from "@/components/Footer/Footer";
import logo from "@/assets/logo.svg";
import learn from "@/assets/study_jigglypuff.png";
import quiz from "@/assets/think_squirtle.png";
import styles from "./HomeMobile.module.scss";

interface IHomeMobileProps {
    shouldTriggerMoves: boolean;
}

const HomeMobile: FC<IHomeMobileProps> = (props) => {
    return (
        <div className={styles.homeMobile}>
            <img src={logo} className={styles.logo} />
            <div className={styles.optionsContainer}>
                <HomeMobileOption
                    shouldTriggerMoves={props.shouldTriggerMoves}
                    to="/learn"
                    text="Learn"
                    subText="Browse through the list of Pokemon to learn their names"
                    imageUrl={learn}
                />
                <HomeMobileOption
                    shouldTriggerMoves={props.shouldTriggerMoves}
                    to="/quiz"
                    text="Quiz"
                    subText="Once you're ready, test your knowledge"
                    imageUrl={quiz}
                    reverse
                />
            </div>
            <Footer />
        </div>
    );
};

export default HomeMobile;
