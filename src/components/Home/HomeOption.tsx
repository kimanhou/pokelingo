import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./HomeOption.module.scss";

interface IHomeOption {
    text: string;
    to: string;
    imageUrl: string;
}

const HomeOption: FC<IHomeOption> = (props) => {
    return (
        <Link to={props.to} className={styles.homeOption}>
            <img src={props.imageUrl} />
            {props.text}
        </Link>
    );
};

export default HomeOption;
