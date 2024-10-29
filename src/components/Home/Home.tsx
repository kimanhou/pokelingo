import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

const Home: FC = (props) => {
    return (
        <div className={styles.home}>
            <Link to="/learn">Learn</Link>
            <Link to="/quiz">Quiz</Link>
        </div>
    );
};

export default Home;
