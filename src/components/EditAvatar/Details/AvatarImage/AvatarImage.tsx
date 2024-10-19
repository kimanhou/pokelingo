import { FC } from "react";
import Ball from "@/assets/Ball";
import { Avatar } from "@/types";
import styles from "./AvatarImage.module.scss";

interface IAvatarImageProps {
  avatar: Avatar;
  isSmallDesktop?: boolean;
  imageOpacity?: number;
  avatarDetailsHeight?: number;
  avatarSpecsHeight?: number;
  isLargeDesktop?: boolean;
}

const AvatarImage: FC<IAvatarImageProps> = (props) => {
  const getBottom = () => {
    if (props.isSmallDesktop) {
      if (props.avatar.id > 0) {
        return "16px";
      } else {
        return "0";
      }
    } else if (
      props.isLargeDesktop &&
      props.avatarDetailsHeight !== undefined &&
      props.avatarSpecsHeight !== undefined
    ) {
      if (props.avatar.id < 0) {
        return Math.min(
          props.avatarDetailsHeight * 0.3,
          props.avatarSpecsHeight
        );
      }
      return Math.max(
        props.avatarDetailsHeight * 0.3 - 40,
        props.avatarSpecsHeight - 20
      );
    }

    return "30%";
  };

  const bottom = getBottom();
  const opacity = !props.isSmallDesktop ? props.imageOpacity : "unset";

  const smallDesktopClassName = props.isSmallDesktop ? styles.smallDesktop : "";

  return (
    <>
      <Ball />
      <div
        className={`${styles.avatarImage} ${smallDesktopClassName}`}
        style={{
          backgroundImage: `url(${props.avatar.imageUrl})`,
          backgroundPositionY: props.avatar.id < 0 ? "bottom" : "center",
          bottom,
          opacity,
        }}
      />
    </>
  );
};

export default AvatarImage;
