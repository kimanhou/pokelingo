import Type from "@/model/util/type";
import RandomIterator from "@/model/util/random-iterator";

export default class Messages {
    constructor(
        private readonly success : RandomIterator<string>,
        private readonly failure : RandomIterator<string>,
    ) {
    }

    getSuccess = () => this.success.get();

    nextSuccess = () => {
        return new Messages(
            this.success.next(),
            this.failure,
        );
    }

    getFailure = () => this.failure.get();

    nextFailure = () => {
        return new Messages(
            this.success,
            this.failure.next(),
        );
    }

    static fromJSON = (json: any) => {
        return new Messages(
            Type.of(RandomIterator.resolveGenerics(Type.STRING)).read(json.successMessages),
            Type.of(RandomIterator.resolveGenerics(Type.STRING)).read(json.failureMessages),
        )
    }

    static getEmpty = () => {
        return new Messages(
            Type.of(RandomIterator.resolveGenerics(Type.STRING)).getEmpty(),
            Type.of(RandomIterator.resolveGenerics(Type.STRING)).getEmpty(),
        )
    }
}