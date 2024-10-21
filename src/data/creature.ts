import ARRAY from "@/data/util/array-of-type"
import JsonUtil from "@/data/util/json-util"
import Type from "@/data/util/type"
import CreatureJa from "@/data/creature-ja"

export default class Creature {
    constructor(
        readonly id : number,
        readonly imageUrl : string,
        readonly tags : string[],
        readonly height : number,
        readonly weight : number,
        readonly types : string[],
        readonly ja : CreatureJa
    ) {
    }

    getImageUrl = () => import.meta.env.BASE_URL + this.imageUrl

    static fromJSON = (json: any) => {
        return new Creature(
            JsonUtil.assert(json.id, Type.NUMBER),
            JsonUtil.assert(json.imageUrl, Type.STRING),
            JsonUtil.assert(json.tags, ARRAY(Type.STRING)),
            JsonUtil.assert(json.height, Type.NUMBER),
            JsonUtil.assert(json.weight, Type.NUMBER),
            JsonUtil.assert(json.types, ARRAY(Type.STRING)),
            JsonUtil.assert(json.ja, Type.OBJECT(CreatureJa.fromJSON))
        )
    }

    static getDefaultValue = () => {
        return new Creature(
            Type.NUMBER.defaultValue,
            Type.STRING.defaultValue,
            ARRAY(Type.STRING).defaultValue,
            Type.NUMBER.defaultValue,
            Type.NUMBER.defaultValue,
            ARRAY(Type.STRING).defaultValue,
            CreatureJa.getDefaultValue()
        )
    }
}