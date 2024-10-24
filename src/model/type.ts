export default class Type<T>{
    constructor(
        readonly name : string,
        readonly assertFn : (value: any) => boolean,
        readonly deserialize : (value: any) => T,
        readonly emptyValue : T
    ){
    }

    read =  (value : any) : T => {
        if(value == null) {
            throw new Error(`Value was null`);
        }
        if(!this.assertFn(value)){
            throw new Error(`Value '${value}' was not of type ${this.name}`);
        }
        return this.deserialize(value);
    }

    readOpt = (value : any) : T | undefined => {
        if(value == null) {
            return undefined;
        }
        return this.read(value);
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
    static ARRAY = <T> (
        type : Type<T>
    ) => new Type<T[]>(
        "array", 
        value => Array.isArray(value),
        value => (value as any[]).map(x => type.read(x)),
        []
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