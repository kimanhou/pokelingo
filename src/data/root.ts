import arrayOfType from "./util/array-of-type"
import JsonUtil from "./util/json-util"
import Type from "./util/type"
import Pokemon from "./pokemon"

export default class Data {
    constructor(
        readonly pokemons : Pokemon[],
    ) {
    }

    static fromJSON = (json: any) => {
        return new Data(
            JsonUtil.assert(json.pokemons, arrayOfType(Type.object(Pokemon.fromJSON)))
        )
    }
}