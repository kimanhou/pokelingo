import { FC } from "react";
import HomeOption from "@/components/Home/HomeOption";
import learn from "@/assets/learn.png";
import quiz from "@/assets/quiz.png";
import styles from "./Home.module.scss";

const Home: FC = (props) => {
    return (
        <div className={styles.home}>
            <div className={styles.optionsContainer}>
                <HomeOption to="/learn" text="Learn" imageUrl={learn} />
                <HomeOption to="/quiz" text="Quiz" imageUrl={quiz} />
            </div>
        </div>
    );
};

export default Home;
