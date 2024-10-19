import ARRAY from "@/data/util/array-of-type"
import JsonUtil from "@/data/util/json-util"
import Type from "@/data/util/type"

export default class CreatureJa {
    constructor(
        readonly name : string,
        readonly altNames : string[],
        readonly tags : string[],
        readonly description : string
    ) {
    }

    static fromJSON = (json: any) => {
        return new CreatureJa(
            JsonUtil.assert(json.name, Type.STRING),
            JsonUtil.assert(json.altNames, ARRAY(Type.STRING)),
            JsonUtil.assert(json.tags, ARRAY(Type.STRING)),
            JsonUtil.assert(json.description, Type.STRING),
        )
    }

    static getDefaultValue = () => {
        return new CreatureJa(
            Type.STRING.defaultValue,
            ARRAY(Type.STRING).defaultValue,
            ARRAY(Type.STRING).defaultValue,
            Type.STRING.defaultValue,
        )
    }
}