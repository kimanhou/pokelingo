import Type from "@/model/util/type"
import Reading from "./reading";

export default class Settings {
    constructor(
        private readonly reading : Reading,
    ) {
    }

    getReading = () => this.reading

    static fromJSON = (json: any) => {
        return new Settings(
            Type.of(Reading).read(json.reading)
        )
    }
}