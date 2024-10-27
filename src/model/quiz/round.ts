import Type from "@/model/util/type";
import RoundStatus from "@/model/quiz/round-status";
import Question from "./question";
import CreatureQuestion from "./creature-question";

export default class Round {
    constructor(
        private readonly question : Question,
        private readonly status : RoundStatus,
    ) {
    }

    getIllustration = () => this.question.getIllustration();

    isOngoing = () => this.status === RoundStatus.ONGOING;

    isFinished = () => this.status !== RoundStatus.ONGOING;

    isSolved = () => this.status === RoundStatus.SOLVED;

    isFailed = () => this.status === RoundStatus.FAILED;

    getAnswer = () => this.question.getAnswer();

    isCorrectAnswer = (input : string) => {
        if(this.question.isCorrectAnswer(input)){
            return true;
        }
        return false;
    }

    solve = () => {
        if(this.status !== RoundStatus.ONGOING){
            throw new Error(`Cannot change Round state from ${this.status.getValue()} to ${RoundStatus.SOLVED.getValue()}`)
        }
        return new Round(this.question, RoundStatus.SOLVED);
    }

    fail = () => {
        if(this.status !== RoundStatus.ONGOING){
            throw new Error(`Cannot change Round state from ${this.status.getValue()} to ${RoundStatus.FAILED.getValue()}`)
        }
        return new Round(this.question, RoundStatus.FAILED);
    }

    static build = (question : Question) => {
        return new Round(
            question,
            RoundStatus.ONGOING
        )
    }

    static fromJSON = (json: any) => {
        return new Round(
            Type.of(CreatureQuestion).read(json.question),
            Type.of(RoundStatus).read(json.solved),
        )
    }

    static getEmpty = () => {
        return new Round(
            Type.of(CreatureQuestion).getEmpty(),
            Type.of(RoundStatus).getEmpty(),
        )
    }
}