import JsonUtil from "@/model/type/json-util"
import Type from "@/model/type/type"
import Reading from "./reading";

export default class Word {
    constructor(
        readonly romaji : string,
        readonly kana : string,
        readonly kanji : string | undefined,
    ) {
    }

    includes = (str : string) => {
        return this.romaji.toLowerCase().includes(str.toLowerCase())
            || this.kana.includes(str)
            || (this.kanji != null && this.kanji.includes(str));
    }

    get = (reading : Reading) => {
        switch(reading) {
            case Reading.ROMAJI:
                return this.romaji;
            case Reading.KANA:
                return this.kana;
        }
        throw new Error("Non exhaustive switch statement.");
    }

    getWithReading = (reading : Reading) => {
        switch(reading) {
            case Reading.ROMAJI:
                return this.getRomajiWithReading();
            case Reading.KANA:
                return this.getKanaWithReading();
        }
        throw new Error("Non exhaustive switch statement.");
    }

    getRomajiWithReading = () => {
        let result = "";
        result += `${this.romaji} (${this.kana})`
        return result;
    }

    getKanaWithReading = () => {
        let result = "";
        result += `${this.kana}`
        if(this.kanji != null){
            result += ` (${this.kanji})`
        }
        return result;
    }

    static fromJSON = (json: any) => {
        return new Word(
            JsonUtil.assert(json.romaji, Type.STRING),
            JsonUtil.assert(json.kana, Type.STRING),
            JsonUtil.assertOptional(json.kanji, Type.STRING),
        )
    }

    static getDefaultValue = () => {
        return new Word(
            Type.STRING.defaultValue,
            Type.STRING.defaultValue,
            Type.STRING.defaultValue,
        )
    }
}