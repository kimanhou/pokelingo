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

export const getCreaturesToLoad = ({
    creature,
    allCreatures,
}: {
    creature: Creature;
    allCreatures: Creature[];
}) => {
    return filterNull([
        getPreviousCreature({ creatureId: creature.getId(), allCreatures }),
        creature,
        getNextCreature({ creatureId: creature.getId(), allCreatures }),
    ]).sort((a, b) => a.getId() - b.getId());
};
