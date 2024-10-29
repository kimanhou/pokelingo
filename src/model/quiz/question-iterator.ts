import Type from "@/model/util/type";
import CreatureQuestion from "@/model/quiz/creature-question";
import Question from "@/model/quiz/question";

export default class QuestionIterator {
    constructor(
        private readonly questions : Question[],
        private readonly index : number,
    ) {
    }

    get = () => this.questions[this.index];

    next = () => {
        if(this.index + 1 < this.questions.length){
            return new QuestionIterator(
                this.questions,
                this.index + 1
            );
        }
        return QuestionIterator.build(this.questions);
    }

    static build = (questions : Question[]) => {
        return new QuestionIterator(
            questions.slice().sort(() => Math.random()-0.5),
            0
        )
    }

    static fromJSON = (json: any) => {
        return new QuestionIterator(
            Type.ARRAY(Type.of(CreatureQuestion)).read(json.questions),
            Type.NUMBER.read(json.index),
        )
    }

    static getEmpty = () => {
        return new QuestionIterator(
            Type.ARRAY(Type.of(CreatureQuestion)).getEmpty(),
            Type.NUMBER.getEmpty(),
        )
    }
}