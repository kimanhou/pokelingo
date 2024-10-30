import Type from "@/model/util/type";
import Round from "@/model/quiz/round";
import RandomIterator from "@/model/util/random-iterator";
import CreatureQuestion from "@/model/quiz/creature-question";
import Question from "@/model/quiz/question";
import MotivationalMessages from "./motivational-messages";

export default class Quiz {
    constructor(
        private readonly rounds : Round[],
        private readonly questions : RandomIterator<Question>,
        private readonly messages: MotivationalMessages,
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

    getSuccessMessage = () => this.messages.getSuccess();

    nextSuccessMessage = () => this.messages.nextSuccess();

    getFailureMessage = () => this.messages.getFailure();

    nextFailureMessage = () => this.messages.nextFailure();

    solveRound = () => {
        return new Quiz(
            [
                ...this.rounds.slice(0, this.rounds.length-1), 
                this.getCurrentRound().solve()
            ],
            this.questions,
            this.messages
        );
    }

    failRound = () => {
        return new Quiz(
            [
                ...this.rounds.slice(0, this.rounds.length-1), 
                this.getCurrentRound().fail()
            ],
            this.questions,
            this.messages
        );
    }

    nextRound = () => {
        const questions = this.questions.next();
        return new Quiz(
            [
                ...this.rounds,
                Round.build(questions.get())
            ],
            questions,
            this.messages
        );
    }

    static fromJSON = (json: any) => {
        return new Quiz(
            Type.ARRAY(Type.of(Round)).read(json.round),
            Type.of(RandomIterator.resolveGenerics(Type.of(CreatureQuestion))).read(json.questions),
            Type.of(MotivationalMessages).read(json.messages),
        )
    }

    static getEmpty = () => {
        return new Quiz(
            Type.ARRAY(Type.of(Round)).getEmpty(),
            Type.of(RandomIterator.resolveGenerics(Type.of(CreatureQuestion))).getEmpty(),
            Type.of(MotivationalMessages).getEmpty(),
        )
    }
}