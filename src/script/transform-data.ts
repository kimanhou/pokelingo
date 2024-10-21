import * as fs from 'fs';
import inData from "@/data/data.json"
import Root from '@/data/root';
import Creature from '@/data/creature';
import CreatureName from '@/data/creature-name';
import { AVATARS } from '@/data/avatars';


const previousCreatures = inData.creatures

const creatures = [];

for(let i=0; i<20; i++){
    creatures.push(
        new Creature(
            i+1,
            new CreatureName(
                AVATARS[i].name ?? "",
                previousCreatures[i]?.ja?.name ?? "",
                null,
                previousCreatures[i]?.ja?.altNames[0] ?? "",
                previousCreatures[i]?.ja?.tags ?? [],
                previousCreatures[i]?.ja?.description ?? "",
            ),
            previousCreatures[i]?.imageUrl ?? `/assets/creature/${i+1}.svg`,
            previousCreatures[i]?.tags ?? ["gen1"],
            previousCreatures[i]?.types ?? AVATARS[i].types ?? [],
        )
    )
}
const outData = new Root(creatures);

fs.writeFileSync("./script-out/generate-empty-out.json", JSON.stringify(outData), {flag: "w"})