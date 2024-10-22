import ARRAY from "@/model/type/array-of-type"
import JsonUtil from "@/model/type/json-util"
import Type from "@/model/type/type"
import Word from "@/model/word"
import Text from "@/model/text"
import Reading from "./reading"

export default class Creature {
    constructor(
        readonly id : number,
        readonly en : String,
        readonly ja : Word,
        readonly imageUrl : string,
        readonly tags : string[],
        readonly types : string[],
        readonly origin : Text,
        readonly originTags : string[],
    ) {
    }

    matchesPartial = (str : string) => {
        return this.en.toLowerCase().includes(str.toLowerCase())
            || this.ja.includes(str)
    }

    getImageUrl = () => import.meta.env.BASE_URL + this.imageUrl

    getName = () => this.ja.get(Reading.KANA)

    getDescription = () => this.origin.get(Reading.KANA)

    static fromJSON = (json: any) => {
        return new Creature(
            JsonUtil.assert(json.id, Type.NUMBER),
            JsonUtil.assert(json.en, Type.STRING),
            JsonUtil.assert(json.ja, Type.of(Word)),
            JsonUtil.assert(json.imageUrl, Type.STRING),
            JsonUtil.assert(json.tags, ARRAY(Type.STRING)),
            JsonUtil.assert(json.types, ARRAY(Type.STRING)),
            JsonUtil.assert(json.origin, Type.of(Text)),
            JsonUtil.assert(json.originTags, ARRAY(Type.STRING)),
        )
    }

    static getEmpty = () => {
        return new Creature(
            Type.NUMBER.emptyValue,
            Type.STRING.emptyValue,
            Type.of(Word).emptyValue,
            Type.STRING.emptyValue,
            ARRAY(Type.STRING).emptyValue,
            ARRAY(Type.STRING).emptyValue,
            Type.of(Text).emptyValue,
            ARRAY(Type.STRING).emptyValue,
        )
    }
}