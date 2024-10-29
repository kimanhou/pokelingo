import Type from "@/model/util/type";
import Round from "@/model/quiz/round";
import RandomIterator from "@/model/util/random-iterator";
import CreatureQuestion from "@/model/quiz/creature-question";
import Question from "@/model/quiz/question";
import Messages from "./messages";

export class QuizImpl implements QuizFailed, QuizSolved, QuizOngoing, Quiz {
    constructor(
        private readonly rounds: Round[],
        private readonly questions: RandomIterator<Question>,
        private readonly messages: Messages
    ) {}

    private getCurrentRound = () => this.rounds[this.rounds.length - 1];

    getImageUrl = () => {
        return this.getCurrentRound().getIllustration();
    };

    getCreatureMainColor = () => {
        return this.getCurrentRound().getMainColor();
    };

    isCorrectAnswer = (input: string) => {
        return this.getCurrentRound().isCorrectAnswer(input);
    };

    getAnswer = () => this.getCurrentRound().getAnswer();

    getMessage = () => {
        if (this.getCurrentRound().isSolved()) {
            return this.messages.getSuccess();
        }
        if (this.getCurrentRound().isFailed()) {
            return this.messages.getFailure();
        }
        throw new Error(
            `Cannot get message for quiz not in solved or failed state.`
        );
    };

    isOngoing = (): this is QuizOngoing => {
        return this.getCurrentRound().isOngoing();
    };

    isSolved = (): this is QuizSolved => {
        return this.getCurrentRound().isSolved();
    };

    isFailed = (): this is QuizFailed => {
        return this.getCurrentRound().isFailed();
    };

    toOngoing = () => {
        return new QuizImpl(
            [
                ...this.rounds.slice(0, this.rounds.length - 1),
                this.getCurrentRound().ongoing(),
            ],
            this.questions,
            this.messages
        );
    };

    toSolved = () => {
        return new QuizImpl(
            [
                ...this.rounds.slice(0, this.rounds.length - 1),
                this.getCurrentRound().solve(),
            ],
            this.questions,
            this.messages.nextSuccess()
        );
    };

    toFailed = () => {
        return new QuizImpl(
            [
                ...this.rounds.slice(0, this.rounds.length - 1),
                this.getCurrentRound().fail(),
            ],
            this.questions,
            this.messages.nextFailure()
        );
    };

    toNextQuestion = () => {
        const questions = this.questions.next();
        return new QuizImpl(
            [...this.rounds, Round.build(questions.get())],
            questions,
            this.messages
        );
    };

    static fromJSON = (json: any) => {
        return new QuizImpl(
            Type.ARRAY(Type.of(Round)).read(json.round),
            Type.of(
                RandomIterator.resolveGenerics(Type.of(CreatureQuestion))
            ).read(json.questions),
            Type.of(Messages).read(json.messages)
        );
    };

    static getEmpty = () => {
        return new QuizImpl(
            Type.ARRAY(Type.of(Round)).getEmpty(),
            Type.of(
                RandomIterator.resolveGenerics(Type.of(CreatureQuestion))
            ).getEmpty(),
            Type.of(Messages).getEmpty()
        );
    };
}

export default interface Quiz {
    isOngoing: () => this is QuizOngoing;
    isSolved: () => this is QuizSolved;
    isFailed: () => this is QuizFailed;
    getImageUrl: () => string;
}

export interface QuizOngoing extends Quiz {
    isCorrectAnswer: (input: string) => boolean;
    toSolved: () => QuizSolved;
    toFailed: () => QuizFailed;
}

export interface QuizSolved extends Quiz {
    toNextQuestion: () => QuizOngoing;
    getMessage: () => string;
}

export interface QuizFailed extends Quiz {
    toOngoing: () => QuizOngoing;
    toNextQuestion: () => QuizOngoing;
    getAnswer: () => string;
    getMessage: () => string;
}
