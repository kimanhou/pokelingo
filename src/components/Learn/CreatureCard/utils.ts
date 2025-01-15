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
        ? null
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
    const previousCreatures = allCreatures.slice(0, creature.getId());
    // const previous = getPreviousCreature({
    //     creatureId: creature.getId(),
    //     allCreatures,
    // }); // creature n - 1
    // const prePrevious = getPreviousCreature({
    //     creatureId: previous.getId(),
    //     allCreatures,
    // }); // creature n - 2
    const next = getNextCreature({
        creatureId: creature.getId(),
        allCreatures,
    }); // creature n + 1
    return filterNull([...previousCreatures, next]).sort(
        (a, b) => a.getId() - b.getId()
    );
};
