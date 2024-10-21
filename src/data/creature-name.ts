import JsonUtil from "@/data/util/json-util"
import Type from "@/data/util/type"
import ARRAY from "./util/array-of-type"

export default class CreatureName {
    constructor(
        readonly en : string,
        readonly kana : string,
        readonly kanji : string | null,
        readonly romaji : string,
        readonly tags : string[],
        readonly description : string
    ) {
    }

    getName = () => this.kana

    includes = (str : string) => {
        return this.en.toLowerCase().includes(str.toLowerCase())
            || this.kana.includes(str)
            || (this.kanji != null && this.kanji.includes(str)) 
            || this.romaji.toLowerCase().includes(str.toLowerCase());
    }

    static fromJSON = (json: any) => {
        return new CreatureName(
            JsonUtil.assert(json.en, Type.STRING),
            JsonUtil.assert(json.kana, Type.STRING),
            JsonUtil.assertNullOptional(json.kanji, Type.STRING),
            JsonUtil.assert(json.romaji, Type.STRING),
            JsonUtil.assert(json.tags, ARRAY(Type.STRING)),
            JsonUtil.assert(json.description, Type.STRING),
        )
    }

    static getDefaultValue = () => {
        return new CreatureName(
            Type.STRING.defaultValue,
            Type.STRING.defaultValue,
            Type.STRING.defaultValue,
            Type.STRING.defaultValue,
            ARRAY(Type.STRING).defaultValue,
            Type.STRING.defaultValue,
        )
    }
}