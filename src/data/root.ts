import arrayOfType from "@/data/util/array-of-type"
import JsonUtil from "@/data/util/json-util"
import Type from "@/data/util/type"
import Pokemon from "@/data/pokemon"

export default class Root {
    constructor(
        readonly pokemons : Pokemon[],
    ) {
    }

    static fromJSON = (json: any) => {
        return new Root(
            JsonUtil.assert(json.pokemons, arrayOfType(Type.object(Pokemon.fromJSON)))
        )
    }
}