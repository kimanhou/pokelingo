import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getNumberOfCreaturesPerLine } from "@/components/Learn/utils";
import Creature from "@/data/creature";

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
                    const lastLine = Math.floor(
                        creatures.length / numberOfCreaturesPerLine
                    );
                    const lineNumber = Math.floor(
                        t.id / numberOfCreaturesPerLine
                    );
                    const columnNumber = t.id % numberOfCreaturesPerLine;
                    const lastColumnNumber =
                        creatures.length % numberOfCreaturesPerLine;
                    const isLastLine =
                        lineNumber === lastLine ||
                        (lineNumber === lastLine - 1 &&
                            columnNumber > lastColumnNumber);

                    if (isLastLine) {
                        return creatures[columnNumber - 1];
                    }

                    return creatures[
                        (lineNumber + 1) * numberOfCreaturesPerLine +
                            columnNumber -
                            1
                    ];
                });
            }
        };

        addEventListener("keydown", onKeyDown);

        return () => removeEventListener("keydown", onKeyDown);
    }, [numberOfCreaturesPerLine]);
};

export default useArrows;
