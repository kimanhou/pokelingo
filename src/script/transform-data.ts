import * as fs from 'fs';
import inData from "@/data/data.json"
import Root from '@/model/root';
import Creature from '@/model/creature';
import { AVATARS } from '@/data/avatars';
import Word from '@/model/word';
import Text from '@/model/text';


const previousCreatures = (inData.creatures as any)
// const previousCreatures = inData.creatures // Use this line for compile time check of previousCreatures usage

const creatures = [];

for(let i=0; i<20; i++){
    creatures.push(
        new Creature(
            i+1,
            previousCreatures[i]?.name?.en ?? AVATARS[i].name ?? "",
            new Word(
                previousCreatures[i]?.name?.romaji ?? "",
                previousCreatures[i]?.name?.kana ?? "",
                previousCreatures[i]?.name?.kanji ?? undefined,
            ),
            previousCreatures[i]?.imageUrl ?? `/assets/creature/${i+1}.svg`,
            previousCreatures[i]?.tags ?? ["gen1"],
            previousCreatures[i]?.types ?? AVATARS[i].types ?? [],
            new Text(
                previousCreatures[i]?.name?.description ?? "",
                []
            ),
            previousCreatures[i]?.name?.tags ?? [],
        )
    )
}
const outData = new Root(creatures);

fs.writeFileSync("./script-out/generate-empty-out.json", JSON.stringify(outData), {flag: "w"})