import Type from "@/model/type"
import Reading from "./reading";
import Word from "./word";

export default class Text {
    constructor(
        readonly value : string,
        readonly words : Word[],
    ) {
    }

    get = (reading : Reading) => {
        let result = "";
        let i = 0;
        const textParts = this.value.split("%w");
        for(const textPart of textParts){
            result += textPart;
            if(i < textParts.length - 1 && this.words[i] != null){
                result += this.words[i].getWithReading(reading)
            }
            i++;
        }
        return result;
    }

    static fromJSON = (json: any) => {
        return new Text(
            Type.STRING.read(json.value),
            Type.ARRAY(Type.of(Word)).read(json.words),
        )
    }

    static getEmpty = () => {
        return new Text(
            Type.STRING.emptyValue,
            Type.ARRAY(Type.of(Word)).emptyValue,
        )
    }
}