import { FC, Dispatch, SetStateAction, useState } from "react";
import AvatarOption from "@/components/EditAvatar/Options/AvatarOption";
import styles from "./AvatarOptions.module.scss";
import Creature from "@/data/creature";
import CreatureCard from "@/components/EditAvatar/CreatureCard/CreatureCard";
import { useIsMobile } from "@/hooks/useIsMobile";

interface IAvatarOptionsProps {
    displayedOptions: Creature[];
    displayedSelectedCreature: Creature;
    setDisplayedSelectedCreature: Dispatch<SetStateAction<Creature>>;
    unavailableCreaturesImageUrl: string[];
    isSmallDesktop: boolean;
}

const AvatarOptions: FC<IAvatarOptionsProps> = (props) => {
    const [selectedCreature, setSelectedCreature] = useState<null | Creature>(
        null
    );
    const [isCreatureCardOpen, setIsCreatureCardOpen] = useState(false);
    const isMobile = useIsMobile();

    const onClickCreature = (creature: Creature) => {
        if (isMobile) {
            setSelectedCreature(creature);
            setIsCreatureCardOpen((t) => !t);
        }
    };

    return (
        <>
            <div className={styles.avatarOptions}>
                <div className={styles.avatarOptionsScroller}>
                    {props.displayedOptions.map((creature) => (
                        <AvatarOption
                            key={creature.id}
                            creature={creature}
                            setDisplayedSelectedCreature={
                                props.setDisplayedSelectedCreature
                            }
                            displayedSelectedCreature={
                                props.displayedSelectedCreature
                            }
                            // isSelected={
                            //     props.displayedSelectedCreature.imageUrl ===
                            //     creature.imageUrl
                            // }
                            isDisabled={props.unavailableCreaturesImageUrl.includes(
                                creature.imageUrl
                            )}
                            isSmallDesktop={props.isSmallDesktop}
                            onClick={() => onClickCreature(creature)}
                        />
                    ))}
                </div>
                <div className={`${styles.scrollerGradient} ${styles.top}`} />
                <div
                    className={`${styles.scrollerGradient} ${styles.bottom}`}
                />
            </div>
            <CreatureCard
                creature={selectedCreature}
                isOpen={isCreatureCardOpen}
                setIsOpen={setIsCreatureCardOpen}
            />
        </>
    );
};

export default AvatarOptions;
