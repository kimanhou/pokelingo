import Type from "@/model/util/type"
import Reading from "@/model/creature/reading";
import Word from "@/model/creature/word";

export default class Text {
    constructor(
        private readonly value : string,
        private readonly words : Word[],
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
            Type.STRING.getEmpty(),
            Type.ARRAY(Type.of(Word)).getEmpty(),
        )
    }
}