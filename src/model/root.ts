import Type from "@/model/type"
import Creature from "@/model/creature"
import data from "@/data/data.json"

export default class Root {
    constructor(
        readonly creatures : Creature[],
    ) {
    }

    static fromJSON = (json: any) => {
        return new Root(
            Type.ARRAY(Type.of(Creature)).read(json.creatures),
        )
    }

    static get = () => {
        return Root.fromJSON(data)
    }
}