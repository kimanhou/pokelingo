import { FC } from "react";
import pokeball from "@/assets/pokeball.png";
import styles from "./Avatar.module.scss";

interface IAvatarProps {
  src?: string;
  backgroundColor?: string;
}

const Avatar: FC<IAvatarProps> = (props) => {
  const imageSrc = props.src ? props.src : pokeball;

  return (
    <div
      className={styles.avatar}
      style={{
        background: props.backgroundColor,
      }}
    >
      <div
        className={styles.avatarContent}
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      ></div>
    </div>
  );
};

export default Avatar;
