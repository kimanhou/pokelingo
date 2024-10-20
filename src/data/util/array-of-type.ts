import JsonUtil from "@/data/util/json-util";
import Type from "@/data/util/type";

const ARRAY = <T> (
    type : Type<T>
) => new Type<T[]>(
    "array", 
    value => Array.isArray(value),
    value => (value as any[]).map(x => JsonUtil.assert(x, type)),
    []
);

const OPT_ARRAY = <T> (
    type : Type<T>
) => new Type<(T|undefined)[]>(
    "array", 
    value => Array.isArray(value),
    value => (value as any[]).map(x => JsonUtil.assertOptional(x, type)),
    []
);

export default ARRAY;