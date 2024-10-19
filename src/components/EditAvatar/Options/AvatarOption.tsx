import { FC, Dispatch, SetStateAction } from "react";
import { getMainColor } from "@/ts/utils";
import { Avatar } from "@/types";
import styles from "./AvatarOption.module.scss";

interface IAvatarOptionProps {
  avatar: Avatar;
  setDisplayedSelectedAvatar: Dispatch<SetStateAction<Avatar>>;
  isSelected: boolean;
  isDisabled: boolean;
  isSmallDesktop: boolean;
}

const AvatarOption: FC<IAvatarOptionProps> = (props) => {
  const isSelectedClassName = props.isSelected ? styles.selected : "";
  const isDisabledClassName = props.isDisabled ? styles.disabled : "";
  const isSmallDesktopClassName = props.isSmallDesktop
    ? styles.smallDesktop
    : "";
  const mainColor = getMainColor(props.avatar);
  const avatarHtmlId =
    props.avatar.id > 0 ? props.avatar.id : props.avatar.id * -1 + 151;

  const onClick = () => {
    if (!props.isDisabled) {
      props.setDisplayedSelectedAvatar(props.avatar);
    }
  };

  return (
    <div
      className={`${styles.avatarOptionWrapper} ${isSelectedClassName} ${isDisabledClassName} ${isSmallDesktopClassName}`}
      style={{ outlineColor: mainColor }}
      onClick={onClick}
      id={`avatar-${avatarHtmlId}`}
    >
      <div
        className={styles.avatarOption}
        style={{ backgroundImage: `url(${props.avatar.imageUrl})` }}
      ></div>
    </div>
  );
};

export default AvatarOption;