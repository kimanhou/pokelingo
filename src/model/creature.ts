import Type from "@/model/type"
import Word from "@/model/word"
import Text from "@/model/text"
import Reading from "./reading"

export default class Creature {
    constructor(
        private readonly id : number,
        private readonly en : String,
        private readonly ja : Word,
        private readonly imageUrl : string,
        private readonly tags : string[],
        private readonly types : string[],
        private readonly origin : Text,
        private readonly originTags : string[],
    ) {
    }

    getId = () => this.id;

    getName = () => this.ja.get(Reading.KANA);

    getImageUrl = () => import.meta.env.BASE_URL + this.imageUrl;

    getTypes = () => this.types;

    getDescription = () => this.origin.get(Reading.KANA);

    matchesPartial = (str : string) => {
        return this.en.toLowerCase().includes(str.toLowerCase())
            || this.ja.includes(str);
    }


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
            Type.NUMBER.getEmpty(),
            Type.STRING.getEmpty(),
            Type.of(Word).getEmpty(),
            Type.STRING.getEmpty(),
            Type.ARRAY(Type.STRING).getEmpty(),
            Type.ARRAY(Type.STRING).getEmpty(),
            Type.of(Text).getEmpty(),
            Type.ARRAY(Type.STRING).getEmpty(),
        )
    }
}