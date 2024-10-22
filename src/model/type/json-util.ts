import Type from "@/model/type/type";

class JsonUtil{
    assertOptional = <T>(value : any, type : Type<T>) : T | undefined => {
        if(value == null) {
            return undefined;
        }
        return this.assert(value, type);
    }
    assertNullOptional = <T>(value : any, type : Type<T>) : T | null => {
        if(value == null) {
            return null;
        }
        return this.assert(value, type);
    }
    assert = <T>(value : any, type : Type<T>) : T => {
        if(value == null) {
            throw new Error(`Value was null`);
        }
        if(!type.assertFn(value)){
            throw new Error(`Value '${value}' was not of type ${type.name}`);
        }
        return type.deserialize(value);
    }
}
export default new JsonUtil();