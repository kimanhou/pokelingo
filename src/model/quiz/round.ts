import Type from "@/model/util/type";
import RoundStatus from "@/model/quiz/round-status";
import Question from "@/model/quiz/question";
import CreatureQuestion from "@/model/quiz/creature-question";

export default class Round {
    constructor(
        private readonly question: Question,
        private readonly status: RoundStatus
    ) {}

    getIllustration = () => this.question.getIllustration();

    getMainColor = () => this.question.getMainColor();

    isOngoing = () => this.status === RoundStatus.ONGOING;

    isSolved = () => this.status === RoundStatus.SOLVED;

    isFailed = () => this.status === RoundStatus.FAILED;

    getAnswer = () => this.question.getAnswer();

    getExplanation = () => this.question.getExplanation();

    isCorrectAnswer = (input: string) => {
        if (this.question.isCorrectAnswer(input)) {
            return true;
        }
        return false;
    };

    ongoing = () => {
        return new Round(this.question, RoundStatus.ONGOING);
    };

    solve = () => {
        return new Round(this.question, RoundStatus.SOLVED);
    };

    fail = () => {
        return new Round(this.question, RoundStatus.FAILED);
    };

    static build = (question: Question) => {
        return new Round(question, RoundStatus.ONGOING);
    };

    static fromJSON = (json: any) => {
        return new Round(
            Type.of(CreatureQuestion).read(json.question),
            Type.of(RoundStatus).read(json.solved)
        );
    };

    static getEmpty = () => {
        return new Round(
            Type.of(CreatureQuestion).getEmpty(),
            Type.of(RoundStatus).getEmpty()
        );
    };
}
