import * as fs from 'fs';
import Root from '@/data/root';
import Creature from '@/data/creature';
import CreatureJa from '@/data/creature-ja';
import { AVATARS } from '@/data/avatars';


const previousCreatures = Root.get().creatures

const creatures = [];

for(let i=0; i<9; i++){
    creatures.push(
        new Creature(
            i+1,
            previousCreatures[i]?.imageUrl ?? `/assets/creature/${i+1}.svg`,
            ["gen1"],
            AVATARS[i].height ?? 0,
            AVATARS[i].weight ?? 0,
            AVATARS[i].types ?? [],
            new CreatureJa(
                previousCreatures[i]?.ja.name ?? "",
                previousCreatures[i]?.ja.altNames ?? [],
                previousCreatures[i]?.ja.tags ?? [],
                previousCreatures[i]?.ja.description ?? "",
            )
        )
    )
}
const data = new Root(creatures);

fs.writeFileSync("./script-out/generate-empty-out.json", JSON.stringify(data), {flag: "w"})