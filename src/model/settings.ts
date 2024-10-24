import Type from "@/model/type"
import Reading from "./reading";

export default class Settings {
    constructor(
        readonly reading : Reading,
    ) {
    }

    static fromJSON = (json: any) => {
        return new Settings(
            Type.of(Reading).read(json.reading)
        )
    }
}