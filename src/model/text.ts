import JsonUtil from "@/model/type/json-util"
import Type from "@/model/type/type"
import Reading from "./reading";
import ARRAY from "./type/array-of-type";
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
            JsonUtil.assert(json.value, Type.STRING),
            JsonUtil.assert(json.words, ARRAY(Type.OBJECT(Word.fromJSON))),
        )
    }

    static getDefaultValue = () => {
        return new Text(
            Type.STRING.defaultValue,
            ARRAY(Type.OBJECT(Word.fromJSON)).defaultValue,
        )
    }
}