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
    const getPreviousCreature = (creatureId: number) => {
        const selectedCreatureIndex = creatureId - 1;
        return selectedCreatureIndex
            ? allCreatures[selectedCreatureIndex - 1]
            : null;
    };

    const getNextCreature = (creatureId: number) => {
        const selectedCreatureIndex = creatureId - 1;
        return selectedCreatureIndex === allCreatures.length - 1
            ? null
            : allCreatures[selectedCreatureIndex + 1];
    };

    const filterNull = (creatures: Array<Creature | null>) => {
        return creatures.filter((t) => t).map((t) => t as Creature);
    };

    const [creaturesToLoad, setCreaturesToLoad] = useState<Creature[]>(
        filterNull([
            getPreviousCreature(creature.getId()),
            creature,
            getNextCreature(creature.getId()),
        ]).sort((a, b) => a.getId() - b.getId())
    );
    const [currentCreatureIndex, setCurrentCreatureIndex] = useState(
        creaturesToLoad.findIndex((x) => x.getId() === creature.getId())
    );

    const onNext = () => {
        const lastIndex = creaturesToLoad.length - 1;
        // you are seeing the second to last creature, then load one more in advance so that you always have one already loaded
        if (currentCreatureIndex >= lastIndex - 1) {
            console.log("add creature !");
            setCreaturesToLoad((old) =>
                filterNull([
                    ...old,
                    getNextCreature(old[old.length - 1].getId()),
                ])
            );
        }

        setCurrentCreatureIndex((t) => {
            console.log(`Setting current creature index to ${t + 1}`);
            return t + 1;
        });
    };

    const onPrevious = () => {
        setCurrentCreatureIndex((currentCreatureIndex) => {
            if (currentCreatureIndex <= 1) {
                setCreaturesToLoad((old) => {
                    return filterNull([
                        getPreviousCreature(
                            old[currentCreatureIndex - 1].getId()
                        ),
                        ...old,
                    ]);
                });
            } else {
                return currentCreatureIndex - 1;
            }
            return currentCreatureIndex;
        });
    };

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
