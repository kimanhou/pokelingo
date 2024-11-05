import Type from "@/model/util/type"
import Reading from "@/model/creature/reading";

export default class Word {
    constructor(
        private readonly romaji : string,
        private readonly kana : string,
        private readonly kanji : string | undefined,
    ) {
    }

    private hiraganaToKatagana = (src: string) => {
        return src.replace(/[\u3041-\u3096]/g, function(match) {
            var chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    }

    private sanitizeRomaji = (romaji: string) => {
        return romaji.toLowerCase()
            .replaceAll("l", "r")
            .replaceAll("c", "k")
            .replaceAll("ā", "aa")
            .replaceAll("ī", "ii")
            .replaceAll("ū", "uu")
            .replaceAll("ē", "ee")
            .replaceAll("ō", "oo");
    }

    includes = (str : string) => {
        return this.sanitizeRomaji(this.romaji).includes(this.sanitizeRomaji(str))
            || this.kana.includes(this.hiraganaToKatagana(str))
            || (this.kanji != null && this.kanji.includes(str));
    }

    equals = (str : string) => {
        return this.sanitizeRomaji(this.romaji) === this.sanitizeRomaji(str)
            || this.kana === this.hiraganaToKatagana(str)
            || this.kanji === str;
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
            Type.STRING.read(json.romaji),
            Type.STRING.read(json.kana),
            Type.STRING.readOpt(json.kanji),
        )
    }

    static getEmpty = () => {
        return new Word(
            Type.STRING.getEmpty(),
            Type.STRING.getEmpty(),
            Type.STRING.getEmpty(),
        )
    }
}