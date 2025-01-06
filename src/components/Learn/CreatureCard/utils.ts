import Creature from "@/model/creature/creature";

export const getPreviousCreature = ({
    creatureId,
    allCreatures,
}: {
    creatureId: number;
    allCreatures: Creature[];
}) => {
    const selectedCreatureIndex = creatureId - 1;
    return selectedCreatureIndex
        ? allCreatures[selectedCreatureIndex - 1]
        : allCreatures[allCreatures.length - 1];
};

export const getNextCreature = ({
    creatureId,
    allCreatures,
}: {
    creatureId: number;
    allCreatures: Creature[];
}) => {
    const selectedCreatureIndex = creatureId - 1;
    return selectedCreatureIndex === allCreatures.length - 1
        ? allCreatures[0]
        : allCreatures[selectedCreatureIndex + 1];
};

export const filterNull = (creatures: Array<Creature | null>) => {
    return creatures.filter((t) => t).map((t) => t as Creature);
};
