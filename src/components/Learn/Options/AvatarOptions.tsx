import { FC, Dispatch, SetStateAction, useState } from "react";
import AvatarOption from "@/components/Learn/Options/AvatarOption";
import styles from "./AvatarOptions.module.scss";
import Creature from "@/data/creature";
import CreatureCard from "@/components/Learn/CreatureCard/CreatureCard";
import { useIsMobile } from "@/hooks/useIsMobile";

interface IAvatarOptionsProps {
    displayedOptions: Creature[];
    displayedSelectedCreature: Creature;
    setDisplayedSelectedCreature: Dispatch<SetStateAction<Creature>>;
    unavailableCreaturesImageUrl: string[];
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
                            isDisabled={props.unavailableCreaturesImageUrl.includes(
                                creature.imageUrl
                            )}
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
