import Type from "@/model/util/type";
import RandomIterator from "@/model/util/random-iterator";

export default class MotivationalMessages {
    constructor(
        private readonly success : RandomIterator<string>,
        private readonly failure : RandomIterator<string>,
    ) {
    }

    getSuccess = () => this.success.get();

    nextSuccess = () => this.success.next();

    getFailure = () => this.failure.get();

    nextFailure = () => this.failure.next();

    static fromJSON = (json: any) => {
        return new MotivationalMessages(
            Type.of(RandomIterator.resolveGenerics(Type.STRING)).read(json.successMessages),
            Type.of(RandomIterator.resolveGenerics(Type.STRING)).read(json.failureMessages),
        )
    }

    static getEmpty = () => {
        return new MotivationalMessages(
            Type.of(RandomIterator.resolveGenerics(Type.STRING)).getEmpty(),
            Type.of(RandomIterator.resolveGenerics(Type.STRING)).getEmpty(),
        )
    }
}