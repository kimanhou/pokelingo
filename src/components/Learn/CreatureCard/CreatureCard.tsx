import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useRef,
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
    console.log("PONEY");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [creaturesToLoad, setCreaturesToLoad] = useState<Creature[]>(
        getCreaturesToLoad({ creature, allCreatures })
    );
    const [currentCreatureIndex, setCurrentCreatureIndex] = useState(
        creaturesToLoad.findIndex((x) => x.getId() === creature.getId())
    );
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const MIN_SWIPE_DISTANCE = 50;

    const onTouchStart = (e: any) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
        const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
        if (isLeftSwipe || isRightSwipe)
            console.log("swipe", isLeftSwipe ? "left" : "right");
        // add your conditional logic here
    };

    const onNext = () => {
        setCurrentCreatureIndex((oldIndex) => {
            setCreaturesToLoad((oldCreaturesToLoad) => {
                const lastIndex = oldCreaturesToLoad.length - 1;
                if (oldIndex >= lastIndex - 1) {
                    return filterNull([
                        ...oldCreaturesToLoad,
                        getNextCreature({
                            creatureId:
                                oldCreaturesToLoad[
                                    oldCreaturesToLoad.length - 1
                                ].getId(),
                            allCreatures,
                        }),
                    ]);
                }
                return oldCreaturesToLoad;
            });

            return oldIndex + 1;
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
        setCreaturesToLoad(getCreaturesToLoad({ creature, allCreatures }));
        setCurrentCreatureIndex(1);
    }, [creature]);

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

    useEffect(() => {
        const onSwipe = (event: any) => {
            console.log("swipe baby", event.deltaX, event.deltaY);
            if (event.deltaX > event.deltaY) {
                if (event.deltaX < 0) {
                    onNext();
                } else {
                    onPrevious();
                }
            }
        };
        wrapperRef.current?.addEventListener("swipe", onSwipe);

        return () => wrapperRef.current?.removeEventListener("swipe", onSwipe);
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
                ref={wrapperRef}
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
