import arrayOfType from "@/data/util/array-of-type"
import JsonUtil from "@/data/util/json-util"
import Type from "@/data/util/type"

export default class PokemonJa {
    constructor(
        readonly name : string,
        readonly altNames : string[],
        readonly tags : string[],
        readonly description : string
    ) {
    }

    static fromJSON = (json: any) => {
        return new PokemonJa(
            JsonUtil.assert(json.name, Type.STRING),
            JsonUtil.assert(json.altNames, arrayOfType(Type.STRING)),
            JsonUtil.assert(json.tags, arrayOfType(Type.STRING)),
            JsonUtil.assert(json.description, Type.STRING),
        )
    }
}