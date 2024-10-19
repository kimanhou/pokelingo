import ARRAY from "@/data/util/array-of-type"
import JsonUtil from "@/data/util/json-util"
import Type from "@/data/util/type"
import Creature from "@/data/creature"
import data from "@/data/data.json"

export default class Root {
    constructor(
        readonly creatures : Creature[],
    ) {
    }

    static fromJSON = (json: any) => {
        return new Root(
            JsonUtil.assert(json.creatures, ARRAY(Type.OBJECT(Creature.fromJSON)))
        )
    }

    static get = () => {
        return Root.fromJSON(data)
    }
}