export default class CreatureTag {
    constructor(
        private readonly value : string,
    ) {
    }

    static GEN1 = new CreatureTag("GEN1");

    private static _values = Object.values(CreatureTag).filter(x => x instanceof CreatureTag).map(x => x as CreatureTag);
    static values = () => {
        return CreatureTag._values;
    }

    static fromJSON = (json: any) => {
        const value = CreatureTag.values().find(c => c.value === json);
        if(value == null){
            const unknownValue = new CreatureTag(json);
            CreatureTag._values.push(unknownValue);
            return unknownValue;
        }
        return value;
    }

    static getEmpty = () => {
        return CreatureTag.GEN1;
    }
    
}