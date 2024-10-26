export default class RoundStatus {
    constructor(
        private readonly value : string,
    ) {
    }

    getValue = () => this.value

    static ONGOING = new RoundStatus("ONGOING");
    static SOLVED = new RoundStatus("SOLVED");
    static FAILED = new RoundStatus("FAILED");

    static values = () => {
        return [RoundStatus.ONGOING, RoundStatus.SOLVED, RoundStatus.FAILED]
    }

    static fromJSON = (json: any) => {
        const value = RoundStatus.values().find(c => c.value === json)
        if(value == null){
            throw Error(`Could not deserialize ${value} as RoundStatus`);
        }
        return value;
    }

    static getEmpty = () => {
        return RoundStatus.ONGOING;
    }
    
}