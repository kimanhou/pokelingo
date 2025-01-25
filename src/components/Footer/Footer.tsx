import { FC } from "react";
import styles from "./Footer.module.scss";

export const Footer: FC = (props) => {
    const currentYear = new Date().getFullYear();
    return <footer className={styles.footer}>&copy; {currentYear}</footer>;
};
