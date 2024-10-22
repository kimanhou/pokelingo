import ARRAY from "@/model/type/array-of-type"
import JsonUtil from "@/model/type/json-util"
import Type from "@/model/type/type"
import Creature from "@/model/creature"
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