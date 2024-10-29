import Type from "@/model/util/type"
import Creature from "@/model/creature/creature"

export default class Root {
    constructor(
        private readonly creatures : Creature[],
    ) {
    }

    getCreatures = () => this.creatures

    static fromJSON = (json: any) => {
        return new Root(
            Type.ARRAY(Type.of(Creature)).read(json.creatures),
        )
    }
}