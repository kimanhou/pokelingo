import Type from "@/model/util/type";

export default class RandomIterator<T> {
    constructor(
        private readonly array : T[],
        private readonly index : number,
    ) {
    }

    get = () => this.array[this.index];

    next = () => {
        if(this.index + 1 < this.array.length){
            return new RandomIterator(
                this.array,
                this.index + 1
            );
        }
        return RandomIterator.build(this.array);
    }

    static build = <T> (array : T[]) => {
        return new RandomIterator(
            array.slice().sort(() => Math.random()-0.5),
            0
        )
    }

    static resolveGenerics = <T> (type: Type<T>) => ({
        fromJSON: (json: any) => {
            return new RandomIterator(
                Type.ARRAY(type).read(json.array),
                Type.NUMBER.read(json.index),
            )
        },
        getEmpty: () => {
            return new RandomIterator(
                Type.ARRAY(type).getEmpty(),
                Type.NUMBER.getEmpty(),
            )
        }
    })
}