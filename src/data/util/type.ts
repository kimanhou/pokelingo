export default class Type<T>{
    constructor(
        readonly name : string,
        readonly assertFn : (value: any) => boolean,
        readonly deserialize : (value: any) => T
    ){
    }

    static STRING = new Type<string>(
        "string", 
        value => typeof value === "string",
        value => value as string
    );
    static NUMBER = new Type<number>(
        "number", 
        value => typeof value === "number",
        value => value as number
    );
    static BOOLEAN = new Type<boolean>(
        "boolean", 
        value => typeof value === "boolean",
        value => value as boolean
    );
    static DATE = new Type<Date>(
        "date", 
        value => value && Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value),
        value => new Date(value)
    );
    static object = <T> (
        deserializer : (json: any) => T
    ) => new Type<T>(
        "object", 
        value => typeof value === "object",
        value => deserializer(value)
    );
}