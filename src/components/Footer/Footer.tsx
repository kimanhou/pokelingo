import { FC } from "react";
import styles from "./Footer.module.scss";

interface IFooterProps {
    alignRight?: boolean;
}

const Footer: FC<IFooterProps> = (props) => {
    const currentYear = new Date().getFullYear();
    const alignRightClassName = props.alignRight ? styles.alignRight : "";

    return (
        <footer className={`${styles.footer} ${alignRightClassName}`}>
            &copy; {currentYear}
        </footer>
    );
};

export default Footer;
