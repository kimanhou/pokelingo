import { FC } from "react";
import styles from "./Footer.module.scss";

export const Footer: FC = (props) => {
  return <footer className={styles.footer}>&copy; 2024</footer>;
};
