import Type from "@/model/util/type";
import Round from "@/model/quiz/round";
import QuestionIterator from "./question-iterator";

export default class Quiz {
    constructor(
        private readonly rounds : Round[],
        private readonly questions : QuestionIterator,
    ) {
    }

    private getCurrentRound = () => this.rounds[this.rounds.length - 1];

    getImageUrl = () => {
        return this.getCurrentRound().getIllustration();
    }

    isCorrectAnswer = (input : string) => {
        return this.getCurrentRound().isCorrectAnswer(input);
    }

    isRoundFinished = () => this.getCurrentRound().isFinished();

    isRoundFailed = () => this.getCurrentRound().isFailed();

    getRoundAnswer = () => this.getCurrentRound().getAnswer();

    solveRound = () => {
        return new Quiz(
            [
                ...this.rounds.slice(0, this.rounds.length-1), 
                this.getCurrentRound().solve()
            ],
            this.questions
        );
    }

    failRound = () => {
        return new Quiz(
            [
                ...this.rounds.slice(0, this.rounds.length-1), 
                this.getCurrentRound().fail()
            ],
            this.questions
        );
    }

    nextRound = () => {
        const questions = this.questions.next();
        return new Quiz(
            [
                ...this.rounds,
                Round.build(questions.get())
            ],
            questions
        );
    }

    static fromJSON = (json: any) => {
        return new Quiz(
            Type.ARRAY(Type.of(Round)).read(json.round),
            Type.of(QuestionIterator).read(json.questions),
        )
    }

    static getEmpty = () => {
        return new Quiz(
            Type.ARRAY(Type.of(Round)).getEmpty(),
            Type.of(QuestionIterator).getEmpty(),
        )
    }
}