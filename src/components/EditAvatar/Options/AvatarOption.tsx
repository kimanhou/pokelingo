import { FC, Dispatch, SetStateAction } from "react";
import { getMainColor } from "@/ts/utils";
import styles from "./AvatarOption.module.scss";
import Creature from "@/data/creature";

interface IAvatarOptionProps {
  creature: Creature;
  setDisplayedSelectedAvatar: Dispatch<SetStateAction<Creature>>;
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
  const mainColor = getMainColor(props.creature);
  const avatarHtmlId =
    props.creature.id > 0 ? props.creature.id : props.creature.id * -1 + 151;

  const onClick = () => {
    if (!props.isDisabled) {
      props.setDisplayedSelectedAvatar(props.creature);
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
        style={{ backgroundImage: `url(${props.creature.imageUrl})` }}
      ></div>
    </div>
  );
};

export default AvatarOption;
