import * as fs from 'fs';
import Root from '@/data/root';
import Pokemon from '@/data/pokemon';
import PokemonJa from '@/data/pokemon-ja';


const pokemons = [];

for(let i=1; i<10; i++){
    pokemons.push(
        new Pokemon(
            i,
            "",
            ["gen1"],
            new PokemonJa(
                "",
                [],
                [],
                ""
            )
        )
    )
}
const data = new Root(pokemons);

fs.writeFileSync("./script-out/generate-empty-out.json", JSON.stringify(data), {flag: "w"})