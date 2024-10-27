import Type from "@/model/util/type"
import Word from "@/model/creature/word"
import Text from "@/model/creature/text"
import Reading from "./reading"
import CreatureTag from "./creature-tag";

export default class Creature {
    constructor(
        private readonly id : number,
        private readonly en : String,
        private readonly ja : Word,
        private readonly imageUrl : string,
        private readonly tags : CreatureTag[],
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

    isGen1 = () => this.tags.includes(CreatureTag.GEN1);

    matchesPartial = (str : string) => {
        return this.en.toLowerCase().includes(str.toLowerCase())
            || this.ja.includes(str);
    }

    matchesJaExact = (str : string) => {
        return this.ja.equals(str);
    }


    static fromJSON = (json: any) => {
        return new Creature(
            Type.NUMBER.read(json.id),
            Type.STRING.read(json.en),
            Type.of(Word).read(json.ja),
            Type.STRING.read(json.imageUrl),
            Type.ARRAY(Type.of(CreatureTag)).read(json.tags),
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
            Type.ARRAY(Type.of(CreatureTag)).getEmpty(),
            Type.ARRAY(Type.STRING).getEmpty(),
            Type.of(Text).getEmpty(),
            Type.ARRAY(Type.STRING).getEmpty(),
        )
    }
}