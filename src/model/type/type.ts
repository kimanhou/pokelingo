export default class Type<T>{
    constructor(
        readonly name : string,
        readonly assertFn : (value: any) => boolean,
        readonly deserialize : (value: any) => T,
        readonly emptyValue : T
    ){
    }

    static STRING = new Type<string>(
        "string", 
        value => typeof value === "string",
        value => value as string,
        ""
    );
    static NUMBER = new Type<number>(
        "number", 
        value => typeof value === "number",
        value => value as number,
        0
    );
    static BOOLEAN = new Type<boolean>(
        "boolean", 
        value => typeof value === "boolean",
        value => value as boolean,
        false
    );
    static DATE = new Type<Date>(
        "date", 
        value => value && Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value),
        value => new Date(value),
        new Date(0)
    );
    static of = <T> (
        klass : {fromJSON : (json : any) => T, getEmpty : () => T}
    ) => new Type<T>(
        "custom-type", 
        value => true,
        value => klass.fromJSON(value),
        klass.getEmpty()
    );
}