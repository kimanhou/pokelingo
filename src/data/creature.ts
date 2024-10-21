import ARRAY from "@/data/util/array-of-type"
import JsonUtil from "@/data/util/json-util"
import Type from "@/data/util/type"
import CreatureName from "@/data/creature-name"

export default class Creature {
    constructor(
        readonly id : number,
        readonly name : CreatureName,
        readonly imageUrl : string,
        readonly tags : string[],
        readonly types : string[],
    ) {
    }

    getImageUrl = () => import.meta.env.BASE_URL + this.imageUrl

    getName = () => this.name.getName()
    getDescription = () => this.name.description

    static fromJSON = (json: any) => {
        return new Creature(
            JsonUtil.assert(json.id, Type.NUMBER),
            JsonUtil.assert(json.name, Type.OBJECT(CreatureName.fromJSON)),
            JsonUtil.assert(json.imageUrl, Type.STRING),
            JsonUtil.assert(json.tags, ARRAY(Type.STRING)),
            JsonUtil.assert(json.types, ARRAY(Type.STRING)),
        )
    }

    static getDefaultValue = () => {
        return new Creature(
            Type.NUMBER.defaultValue,
            CreatureName.getDefaultValue(),
            Type.STRING.defaultValue,
            ARRAY(Type.STRING).defaultValue,
            ARRAY(Type.STRING).defaultValue,
        )
    }
}