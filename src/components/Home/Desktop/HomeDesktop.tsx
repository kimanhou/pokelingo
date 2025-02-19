import { FC } from "react";
import Footer from "@/components/Footer/Footer";
import HomeOption from "@/components/Home/HomeOption";
import logo from "@/assets/logo.svg";
import learn from "@/assets/study_jigglypuff.png";
import quiz from "@/assets/think_squirtle.png";
import styles from "./HomeDesktop.module.scss";

const HomeDesktop: FC = (props) => {
    return (
        <div className={styles.homeDesktop}>
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
                        secondary
                    />
                    <div className={styles.placeholder}></div>
                </div>
            </div>
            <Footer alignRight />
        </div>
    );
};

export default HomeDesktop;
