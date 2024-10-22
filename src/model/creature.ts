import Type from "@/model/type"
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
            Type.NUMBER.read(json.id),
            Type.STRING.read(json.en),
            Type.of(Word).read(json.ja),
            Type.STRING.read(json.imageUrl),
            Type.ARRAY(Type.STRING).read(json.tags),
            Type.ARRAY(Type.STRING).read(json.types),
            Type.of(Text).read(json.origin),
            Type.ARRAY(Type.STRING).read(json.originTags),
        )
    }

    static getEmpty = () => {
        return new Creature(
            Type.NUMBER.emptyValue,
            Type.STRING.emptyValue,
            Type.of(Word).emptyValue,
            Type.STRING.emptyValue,
            Type.ARRAY(Type.STRING).emptyValue,
            Type.ARRAY(Type.STRING).emptyValue,
            Type.of(Text).emptyValue,
            Type.ARRAY(Type.STRING).emptyValue,
        )
    }
}