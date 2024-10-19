import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./IconButton.module.scss";

interface IIconButtonProps {
  icon: IconProp;
  onClick: () => void;
  color?: string;
}

const IconButton: FC<IIconButtonProps> = ({
  icon,
  onClick,
  color,
}: IIconButtonProps) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      <FontAwesomeIcon icon={icon} color={color} />
    </button>
  );
};

export default IconButton;
