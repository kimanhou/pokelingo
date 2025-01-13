import {
    Dispatch,
    FC,
    SetStateAction,
    TouchEvent,
    useEffect,
    useState,
} from "react";
import Creature from "@/model/creature/creature";
import ModalDialog from "@/components/common/ModalDialog/ModalDialog";
import AvatarDetails from "@/components/Learn/Details/AvatarDetails";
import {
    filterNull,
    getCreaturesToLoad,
    getNextCreature,
    getPreviousCreature,
} from "./utils";
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
        getCreaturesToLoad({ creature, allCreatures })
    );
    const [activeIndex, setActiveIndex] = useState(1);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const MIN_SWIPE_DISTANCE = 50;

    const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent<HTMLDivElement>) =>
        setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
        const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

        if (isLeftSwipe) {
            onNext();
        }
        if (isRightSwipe) {
            onPrevious();
        }
    };

    const onNext = () => {
        setActiveIndex((oldIndex) => {
            setCreaturesToLoad((oldCreaturesToLoad) => {
                const lastIndex = oldCreaturesToLoad.length - 1;
                if (oldIndex >= lastIndex - 1) {
                    const nextCreature = getNextCreature({
                        creatureId:
                            oldCreaturesToLoad[
                                oldCreaturesToLoad.length - 1
                            ].getId(),
                        allCreatures,
                    });
                    console.log("onNext add", nextCreature.getName());
                    return filterNull([...oldCreaturesToLoad, nextCreature]);
                }
                return oldCreaturesToLoad;
            });

            return oldIndex + 1;
        });
    };

    const onPrevious = () => {
        setActiveIndex((oldIndex) => {
            if (oldIndex <= 1) {
                setCreaturesToLoad((oldCreaturesToLoad) => {
                    const previousCreature = getPreviousCreature({
                        creatureId: oldCreaturesToLoad[oldIndex - 1].getId(),
                        allCreatures,
                    });
                    console.log("onPrevious add", previousCreature.getName());
                    return filterNull([
                        previousCreature,
                        ...oldCreaturesToLoad,
                    ]);
                });
                return oldIndex;
            } else {
                return oldIndex - 1;
            }
        });
    };

    useEffect(() => {
        setCreaturesToLoad(getCreaturesToLoad({ creature, allCreatures }));
        setActiveIndex(1);
    }, [creature]);

    return (
        <ModalDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeOnClickOutside
            className={styles.creatureCardModalDialog}
        >
            <div
                className={styles.creatureCardWrapper}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
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
