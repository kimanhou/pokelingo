import arrayOfType from "./util/array-of-type"
import JsonUtil from "./util/json-util"
import Type from "./util/type"

export default class PokemonJaData {
    constructor(
        readonly name : string,
        readonly altNames : string[],
        readonly tags : string[],
        readonly description : string
    ) {
    }

    static fromJSON = (json: any) => {
        return new PokemonJaData(
            JsonUtil.assert(json.name, Type.STRING),
            JsonUtil.assert(json.altNames, arrayOfType(Type.STRING)),
            JsonUtil.assert(json.tags, arrayOfType(Type.STRING)),
            JsonUtil.assert(json.description, Type.STRING),
        )
    }
}