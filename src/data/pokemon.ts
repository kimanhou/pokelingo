import arrayOfType from "./util/array-of-type"
import JsonUtil from "./util/json-util"
import Type from "./util/type"
import PokemonJaData from "./pokemon-ja"

export default class Pokemon {
    constructor(
        readonly id : number,
        readonly img : string,
        readonly tags : string[],
        readonly ja : PokemonJaData
    ) {
    }

    static fromJSON = (json: any) => {
        return new Pokemon(
            JsonUtil.assert(json.id, Type.NUMBER),
            JsonUtil.assert(json.img, Type.STRING),
            JsonUtil.assert(json.tags, arrayOfType(Type.STRING)),
            JsonUtil.assert(json.ja, Type.object(PokemonJaData.fromJSON))
        )
    }
}