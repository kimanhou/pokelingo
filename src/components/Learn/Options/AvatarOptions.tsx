import { FC, Dispatch, SetStateAction, useState } from "react";
import Creature from "@/model/creature/creature";
import AvatarOption from "@/components/Learn/Options/AvatarOption";
import CreatureCard from "@/components/Learn/CreatureCard/CreatureCard";
import { useDeviceType } from "@/hooks/useMedia";
import { isMobile } from "@/ts/utils";
import styles from "./AvatarOptions.module.scss";

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
    const deviceType = useDeviceType();

    const onClickCreature = (creature: Creature) => {
        if (isMobile(deviceType)) {
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
                            key={creature.getId()}
                            creature={creature}
                            setDisplayedSelectedCreature={
                                props.setDisplayedSelectedCreature
                            }
                            displayedSelectedCreature={
                                props.displayedSelectedCreature
                            }
                            isDisabled={props.unavailableCreaturesImageUrl.includes(
                                creature.getImageUrl()
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
            {selectedCreature && (
                <CreatureCard
                    creature={selectedCreature}
                    isOpen={isCreatureCardOpen}
                    setIsOpen={setIsCreatureCardOpen}
                    allCreatures={props.displayedOptions}
                />
            )}
        </>
    );
};

export default AvatarOptions;
