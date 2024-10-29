import * as fs from "fs";
import inData from "@/data/data.json"
import Root from "@/model/root/root";
import Creature from "@/model/creature/creature";
import { AVATARS } from "@/data/avatars";
import Word from "@/model/creature/word";
import Text from "@/model/creature/text";
import CreatureTag from "@/model/creature/creature-tag";


// const previousCreatures = (inData.creatures as any)
const previousCreatures = inData.creatures // Use this line for compile time check of previousCreatures usage

const creatures = [];

for(let i=0; i<30; i++){
    creatures.push(
        new Creature(
            i+1,
            previousCreatures[i]?.en ?? AVATARS[i].name ?? "",
            new Word(
                previousCreatures[i]?.ja?.romaji ?? "",
                previousCreatures[i]?.ja?.kana ?? "",
                previousCreatures[i]?.ja?.kanji ?? undefined,
            ),
            previousCreatures[i]?.imageUrl ?? `/assets/creature/${i+1}.svg`,
            previousCreatures[i]?.tags?.map(CreatureTag.fromJSON) ?? [CreatureTag.GEN1],
            previousCreatures[i]?.types ?? AVATARS[i].types ?? [],
            new Text(
                previousCreatures[i]?.origin?.value ?? "",
                previousCreatures[i]?.origin?.words?.map((x: any) => new Word(x.romaji, x.kana, x.kanji)) ?? []
            ),
            previousCreatures[i]?.originTags ?? [],
        )
    )
}
const outData = new Root(creatures);

fs.writeFileSync("./script-out/generate-empty-out.json", JSON.stringify(outData), {flag: "w"})