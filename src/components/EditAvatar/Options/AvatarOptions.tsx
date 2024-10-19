import { FC, Dispatch, SetStateAction } from "react";
import AvatarOption from "@/components/EditAvatar/Options/AvatarOption";
import { Avatar } from "@/types";
import styles from "./AvatarOptions.module.scss";

interface IAvatarOptionsProps {
  displayedOptions: Avatar[];
  displayedSelectedAvatar: Avatar;
  setDisplayedSelectedAvatar: Dispatch<SetStateAction<Avatar>>;
  unavailableAvatarsImageUrl: string[];
  isSmallDesktop: boolean;
}

const AvatarOptions: FC<IAvatarOptionsProps> = (props) => {
  return (
    <div className={styles.avatarOptions}>
      <div className={styles.avatarOptionsScroller}>
        {props.displayedOptions.map((avatar) => (
          <AvatarOption
            key={avatar.id}
            avatar={avatar}
            setDisplayedSelectedAvatar={props.setDisplayedSelectedAvatar}
            isSelected={
              props.displayedSelectedAvatar.imageUrl === avatar.imageUrl
            }
            isDisabled={props.unavailableAvatarsImageUrl.includes(
              avatar.imageUrl
            )}
            isSmallDesktop={props.isSmallDesktop}
          />
        ))}
      </div>
      <div className={`${styles.scrollerGradient} ${styles.top}`} />
      <div className={`${styles.scrollerGradient} ${styles.bottom}`} />
    </div>
  );
};

export default AvatarOptions;
