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
        return Object.values(RoundStatus).filter(x => x instanceof RoundStatus).map(x => x as RoundStatus);
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