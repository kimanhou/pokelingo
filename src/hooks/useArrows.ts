import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Creature from "@/data/creature";

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
                setDisplayedSelectedCreature(
                    (t) => creatures[t.id % creatures.length]
                );
            }
            if (e.key === "ArrowLeft") {
                setDisplayedSelectedCreature((t) => {
                    if (t.id > 1) {
                        return creatures[t.id - 2];
                    }
                    return creatures[creatures.length - 1];
                });
            }
            if (e.key === "ArrowUp") {
                setDisplayedSelectedCreature((t) => {
                    const lineNumber = Math.floor(
                        (t.id - 1) / numberOfCreaturesPerLine
                    );
                    const columnNumber =
                        t.id % numberOfCreaturesPerLine ||
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
                        return creatures[
                            targetLine * numberOfCreaturesPerLine +
                                columnNumber -
                                1
                        ];
                    }

                    return creatures[
                        (lineNumber - 1) * numberOfCreaturesPerLine +
                            columnNumber -
                            1
                    ];
                });
            }
            if (e.key === "ArrowDown") {
                setDisplayedSelectedCreature((t) => {
                    const lastLineIndex = Math.floor(
                        (creatures.length - 1) / numberOfCreaturesPerLine
                    );
                    const currentLineIndex = Math.floor(
                        (t.id - 1) / numberOfCreaturesPerLine
                    );
                    const currentColumnIndex =
                        t.id === 1 ? 0 : (t.id - 1) % numberOfCreaturesPerLine;
                    const lastColumnIndex =
                        (creatures.length - 1) % numberOfCreaturesPerLine;
                    const isLastLine =
                        currentLineIndex === lastLineIndex ||
                        (currentLineIndex === lastLineIndex - 1 &&
                            currentColumnIndex > lastColumnIndex);

                    if (isLastLine) {
                        return creatures[currentColumnIndex];
                    }

                    return creatures[
                        (currentLineIndex + 1) * numberOfCreaturesPerLine +
                            currentColumnIndex
                    ];
                });
            }
        };

        addEventListener("keydown", onKeyDown);

        return () => removeEventListener("keydown", onKeyDown);
    }, [numberOfCreaturesPerLine]);
};

export default useArrows;
