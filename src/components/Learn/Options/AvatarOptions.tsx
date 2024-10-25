import { FC, Dispatch, SetStateAction, useState } from "react";
import AvatarOption from "@/components/Learn/Options/AvatarOption";
import Creature from "@/model/creature/creature";
import CreatureCard from "@/components/Learn/CreatureCard/CreatureCard";
import { useDeviceType } from "@/hooks/useIsMobile";
import { DeviceType } from "@/ts/enums";
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
    const [previousCreature, setPreviousCreature] = useState<null | Creature>(
        null
    );
    const [nextCreature, setNextCreature] = useState<null | Creature>(null);
    const [isCreatureCardOpen, setIsCreatureCardOpen] = useState(false);
    const deviceType = useDeviceType();

    const onClickCreature = (creature: Creature) => {
        if (deviceType === DeviceType.MOBILE) {
            setSelectedCreature(creature);
            setPreviousCreature(() => {
                const selectedCreatureIndex = creature.id - 1;
                return selectedCreatureIndex
                    ? props.displayedOptions[selectedCreatureIndex - 1]
                    : null;
            });
            setNextCreature(() => {
                const selectedCreatureIndex = creature.id - 1;
                return selectedCreatureIndex ===
                    props.displayedOptions.length - 1
                    ? null
                    : props.displayedOptions[selectedCreatureIndex + 1];
            });
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
            <CreatureCard
                creature={selectedCreature}
                isOpen={isCreatureCardOpen}
                setIsOpen={setIsCreatureCardOpen}
                previousCreature={previousCreature}
                nextCreature={nextCreature}
            />
        </>
    );
};

export default AvatarOptions;
