import { FC, Dispatch, SetStateAction } from "react";
import AvatarOption from "@/components/EditAvatar/Options/AvatarOption";
import { Avatar } from "@/types";
import styles from "./AvatarOptions.module.scss";
import Creature from "@/data/creature";

interface IAvatarOptionsProps {
  displayedOptions: Creature[];
  displayedSelectedAvatar: Creature;
  setDisplayedSelectedAvatar: Dispatch<SetStateAction<Creature>>;
  unavailableAvatarsImageUrl: string[];
  isSmallDesktop: boolean;
}

const AvatarOptions: FC<IAvatarOptionsProps> = (props) => {
  return (
    <div className={styles.avatarOptions}>
      <div className={styles.avatarOptionsScroller}>
        {props.displayedOptions.map((creature) => (
          <AvatarOption
            key={creature.id}
            creature={creature}
            setDisplayedSelectedAvatar={props.setDisplayedSelectedAvatar}
            isSelected={
              props.displayedSelectedAvatar.imageUrl === creature.imageUrl
            }
            isDisabled={props.unavailableAvatarsImageUrl.includes(
              creature.imageUrl
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
