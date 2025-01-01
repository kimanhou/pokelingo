import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Creature from "@/model/creature/creature";
import ModalDialog from "@/components/common/ModalDialog/ModalDialog";
import AvatarDetails from "@/components/Learn/Details/AvatarDetails";
import styles from "./CreatureCard.module.scss";

interface ICreatureCardProps {
    creature: Creature;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    allCreatures: Creature[];
}

const CreatureCard: FC<ICreatureCardProps> = ({
    creature,
    isOpen,
    setIsOpen,
    allCreatures,
}: ICreatureCardProps) => {
    const getPreviousCreature = () => {
        const selectedCreatureIndex = creature.getId() - 1;
        return selectedCreatureIndex
            ? allCreatures[selectedCreatureIndex - 1]
            : null;
    };

    const getNextCreature = () => {
        const selectedCreatureIndex = creature.getId() - 1;
        return selectedCreatureIndex === allCreatures.length - 1
            ? null
            : allCreatures[selectedCreatureIndex + 1];
    };

    const [creaturesToLoad, setCreaturesToLoad] = useState<Creature[]>(
        [getPreviousCreature(), creature, getNextCreature()]
            .filter((t) => t)
            .map((t) => t as Creature)
            .sort((a, b) => a.getId() - b.getId())
    );
    const [currentCreatureIndex, setCurrentCreatureIndex] = useState(
        creaturesToLoad.findIndex((x) => x.getId() === creature?.getId())
    );

    const onNext = () => {
        setCurrentCreatureIndex((t) => t + 1);
    };

    const onPrevious = () => {
        setCurrentCreatureIndex((t) => t - 1);
    };

    useEffect(() => {
        if (isOpen) {
            setCurrentCreatureIndex(
                creaturesToLoad.findIndex(
                    (x) => x.getId() === creature?.getId()
                )
            );
        }
    }, [isOpen]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                onNext();
            }
            if (e.key === "ArrowLeft") {
                onPrevious();
            }
        };

        addEventListener("keydown", onKeyDown);

        return () => removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <ModalDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeOnClickOutside
            className={styles.creatureCardModalDialog}
        >
            <div
                className={styles.creatureCardWrapper}
                style={{
                    left: `-${currentCreatureIndex * 100}%`,
                }}
            >
                {creaturesToLoad.map((t) => (
                    <AvatarDetails
                        key={t.getId()}
                        creature={t}
                        search=""
                        setSearch={(value: string) => {}}
                        isCreatureCard
                        onClick={() => setIsOpen(false)}
                    />
                ))}
            </div>
        </ModalDialog>
    );
};

export default CreatureCard;
