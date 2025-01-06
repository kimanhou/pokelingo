import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Creature from "@/model/creature/creature";
import ModalDialog from "@/components/common/ModalDialog/ModalDialog";
import AvatarDetails from "@/components/Learn/Details/AvatarDetails";
import { filterNull, getNextCreature, getPreviousCreature } from "./utils";
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
    const [creaturesToLoad, setCreaturesToLoad] = useState<Creature[]>(
        filterNull([
            getPreviousCreature({ creatureId: creature.getId(), allCreatures }),
            creature,
            getNextCreature({ creatureId: creature.getId(), allCreatures }),
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
                    getNextCreature({
                        creatureId: old[old.length - 1].getId(),
                        allCreatures,
                    }),
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
                        getPreviousCreature({
                            creatureId: old[currentCreatureIndex - 1].getId(),
                            allCreatures,
                        }),
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
