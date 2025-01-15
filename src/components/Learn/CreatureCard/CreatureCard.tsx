import {
    Dispatch,
    FC,
    SetStateAction,
    TouchEvent,
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
import { renderToStaticMarkup } from "react-dom/server";

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
    const wrapperRef = useRef<HTMLDivElement>(null);
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
        // if (isRightSwipe) {
        //     // setTimeout(() => onPrevious(), 1000);
        //     onPrevious();
        // }
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
                    if (!nextCreature)
                        return filterNull([
                            ...oldCreaturesToLoad,
                            nextCreature,
                        ]);
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
                    const activeCreature = creaturesToLoad[oldIndex - 1];
                    const previousCreature = getPreviousCreature({
                        creatureId: activeCreature.getId(),
                        allCreatures,
                    });
                    console.log("onPrevious add", previousCreature.getName());

                    // setTimeout(() => {
                    //     console.log("scroll to", activeCreature.getName());
                    //     const activeDiv = document.getElementById(
                    //         `avatar-details-id-${activeCreature.getId()}`
                    //     );
                    //     activeDiv?.scrollIntoView();
                    // }, 1000);

                    // const wrapper = document.getElementById("creature-wrapper");
                    // const activeDiv = document.getElementById(
                    //     `avatar-details-id-${activeCreature.getId()}`
                    // );
                    // const output = document.createElement("div");
                    // const staticElement = renderToStaticMarkup(
                    //     <AvatarDetails
                    //         key={previousCreature.getId()}
                    //         creature={previousCreature}
                    //         search=""
                    //         setSearch={(value: string) => {}}
                    //         isCreatureCard
                    //         onClick={() => setIsOpen(false)}
                    //     />
                    // );
                    // output.innerHTML = staticElement;
                    // wrapper?.insertBefore(output.firstChild!, activeDiv);
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

        // Scroll active creature into view
        const activeDiv = document.getElementById(
            `avatar-details-id-${creature.getId()}`
        );
        activeDiv?.scrollIntoView();
    }, [creature]);

    return (
        <ModalDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeOnClickOutside
            className={styles.creatureCardModalDialog}
        >
            <div
                // id="creature-wrapper"
                ref={wrapperRef}
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
