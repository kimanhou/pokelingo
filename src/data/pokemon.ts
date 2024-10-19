import arrayOfType from "@/data/util/array-of-type"
import JsonUtil from "@/data/util/json-util"
import Type from "@/data/util/type"
import PokemonJa from "@/data/pokemon-ja"

export default class Pokemon {
    constructor(
        readonly id : number,
        readonly img : string,
        readonly tags : string[],
        readonly ja : PokemonJa
    ) {
    }

    static fromJSON = (json: any) => {
        return new Pokemon(
            JsonUtil.assert(json.id, Type.NUMBER),
            JsonUtil.assert(json.img, Type.STRING),
            JsonUtil.assert(json.tags, arrayOfType(Type.STRING)),
            JsonUtil.assert(json.ja, Type.object(PokemonJa.fromJSON))
        )
    }
}