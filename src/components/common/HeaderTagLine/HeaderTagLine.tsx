import { FC } from "react";
import styles from "./HeaderTagLine.module.scss";

interface IHeaderTagLineProps {
  teamName?: string;
  isPageHeader?: boolean;
}

const HeaderTagLine: FC<IHeaderTagLineProps> = (props) => {
  const isPageHeaderClassName = props.isPageHeader ? styles.pageHeader : "";

  return (
    <div className={`${styles.tagLine} ${isPageHeaderClassName}`}>
      <div className={`${styles.tagLineDecoration} ${styles.left}`} />
      <h4>
        <i>{props.teamName} Sprint Retro</i>
      </h4>
      <div className={`${styles.tagLineDecoration} ${styles.right}`} />
    </div>
  );
};

export default HeaderTagLine;
