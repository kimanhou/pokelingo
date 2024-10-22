export default class Reading {
    constructor(
        readonly value : string,
    ) {
    }

    static ROMAJI = new Reading("ROMAJI");
    static KANA = new Reading("KANA");

    static values = () => {
        return [Reading.ROMAJI, Reading.KANA]
    }

    static fromJSON = (json: any) => {
        const value = Reading.values().find(c => c.value === json)
        if(value == null){
            throw Error(`Could not deserialize ${value} as Reading`);
        }
        return value;
    }

    static getEmpty = () => {
        return Reading.ROMAJI;
    }
    
}