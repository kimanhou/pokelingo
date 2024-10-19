import { FC, Dispatch, SetStateAction } from "react";
import AvatarOption from "@/components/EditAvatar/Options/AvatarOption";
import styles from "./AvatarOptions.module.scss";
import Creature from "@/data/creature";

interface IAvatarOptionsProps {
  displayedOptions: Creature[];
  displayedSelectedCreature: Creature;
  setDisplayedSelectedCreature: Dispatch<SetStateAction<Creature>>;
  unavailableCreaturesImageUrl: string[];
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
            setDisplayedSelectedCreature={props.setDisplayedSelectedCreature}
            isSelected={
              props.displayedSelectedCreature.imageUrl === creature.imageUrl
            }
            isDisabled={props.unavailableCreaturesImageUrl.includes(
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
