import JsonUtil from "@/model/type/json-util"
import Type from "@/model/type/type"
import Reading from "./reading";

export default class Settings {
    constructor(
        readonly reading : Reading,
    ) {
    }

    static fromJSON = (json: any) => {
        return new Settings(
            JsonUtil.assert(json.reading, Type.of(Reading))
        )
    }
}