import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { scrollToCreatureIndex } from "@/ts/utils";
import Creature from "@/model/creature/creature";

const getNumberOfCreaturesPerLine = (windowWidth: number) => {
    if (windowWidth > 823) {
        return 8;
    }
    if (windowWidth > 727) {
        return 7;
    }
    if (windowWidth > 631) {
        return 6;
    }
    if (windowWidth > 535) {
        return 5;
    }
    if (windowWidth > 439) {
        return 4;
    }
    return 3;
};

const useArrows = ({
    setDisplayedSelectedCreature,
    creatures,
}: {
    setDisplayedSelectedCreature: Dispatch<SetStateAction<Creature>>;
    creatures: Creature[];
}) => {
    const [numberOfCreaturesPerLine, setNumberOfCreaturesPerLine] = useState(
        getNumberOfCreaturesPerLine(window.innerWidth)
    );

    useEffect(() => {
        const handleResize = () => {
            setNumberOfCreaturesPerLine(
                getNumberOfCreaturesPerLine(window.innerWidth)
            );
        };

        window.addEventListener("resize", handleResize);
        return () => removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                setDisplayedSelectedCreature((t : Creature) => {
                    const targetIndex = t.getId() % creatures.length;
                    scrollToCreatureIndex({ creatureIndex: targetIndex });
                    return creatures[t.getId() % creatures.length];
                });
            }
            if (e.key === "ArrowLeft") {
                setDisplayedSelectedCreature((t : Creature) => {
                    const targetIndex =
                        t.getId() > 1 ? t.getId() - 2 : creatures.length - 1;
                    scrollToCreatureIndex({ creatureIndex: targetIndex });
                    return creatures[targetIndex];
                });
            }
            if (e.key === "ArrowUp") {
                setDisplayedSelectedCreature((t : Creature) => {
                    const lineNumber = Math.floor(
                        (t.getId()- 1) / numberOfCreaturesPerLine
                    );
                    const columnNumber =
                        t.getId()% numberOfCreaturesPerLine ||
                        numberOfCreaturesPerLine;

                    if (lineNumber === 0) {
                        const lastColumnNumber =
                            creatures.length % numberOfCreaturesPerLine;
                        const targetLine =
                            columnNumber > lastColumnNumber
                                ? Math.floor(
                                      creatures.length /
                                          numberOfCreaturesPerLine
                                  ) - 1
                                : Math.floor(
                                      creatures.length /
                                          numberOfCreaturesPerLine
                                  );
                        const targetIndex =
                            targetLine * numberOfCreaturesPerLine +
                            columnNumber -
                            1;
                        scrollToCreatureIndex({ creatureIndex: targetIndex });
                        return creatures[targetIndex];
                    }

                    const targetIndex =
                        (lineNumber - 1) * numberOfCreaturesPerLine +
                        columnNumber -
                        1;
                    scrollToCreatureIndex({ creatureIndex: targetIndex });
                    return creatures[targetIndex];
                });
            }
            if (e.key === "ArrowDown") {
                setDisplayedSelectedCreature((t : Creature) => {
                    const lastLineIndex = Math.floor(
                        (creatures.length - 1) / numberOfCreaturesPerLine
                    );
                    const currentLineIndex = Math.floor(
                        (t.getId()- 1) / numberOfCreaturesPerLine
                    );
                    const currentColumnIndex =
                        t.getId()=== 1 ? 0 : (t.getId()- 1) % numberOfCreaturesPerLine;
                    const lastColumnIndex =
                        (creatures.length - 1) % numberOfCreaturesPerLine;
                    const isLastLine =
                        currentLineIndex === lastLineIndex ||
                        (currentLineIndex === lastLineIndex - 1 &&
                            currentColumnIndex > lastColumnIndex);

                    const targetIndex = isLastLine
                        ? currentColumnIndex
                        : (currentLineIndex + 1) * numberOfCreaturesPerLine +
                          currentColumnIndex;
                    scrollToCreatureIndex({ creatureIndex: targetIndex });
                    return creatures[targetIndex];
                });
            }
        };

        addEventListener("keydown", onKeyDown);

        return () => removeEventListener("keydown", onKeyDown);
    }, [numberOfCreaturesPerLine]);
};

export default useArrows;
