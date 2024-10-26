import Type from "@/model/util/type";
import Round from "@/model/quiz/round";
import Creature from "../creature/creature";

export default class Quiz {
    constructor(
        private readonly rounds : Round[],
        private readonly creatures : Creature[],
    ) {
    }

    private getCurrentRound = () => this.rounds[this.rounds.length - 1];

    private getRandomCreature = () => this.creatures[Math.floor(Math.random()*this.creatures.length)];

    getImageUrl = () => {
        return this.getCurrentRound().getImageUrl();
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
            this.creatures
        );
    }

    failRound = () => {
        return new Quiz(
            [
                ...this.rounds.slice(0, this.rounds.length-1), 
                this.getCurrentRound().fail()
            ],
            this.creatures
        );
    }

    nextRound = () => {
        return new Quiz(
            [
                ...this.rounds,
                Round.build(this.getRandomCreature())
            ],
            this.creatures
        );
    }

    static build = (creatures : Creature[]) => {
        return new Quiz(
            [Round.build(creatures[Math.floor(Math.random()*creatures.length)])],
            creatures
        )
    }

    static fromJSON = (json: any) => {
        return new Quiz(
            Type.ARRAY(Type.of(Round)).read(json.round),
            Type.ARRAY(Type.of(Creature)).read(json.creature),
        )
    }

    static getEmpty = () => {
        return new Quiz(
            Type.ARRAY(Type.of(Round)).getEmpty(),
            Type.ARRAY(Type.of(Creature)).getEmpty(),
        )
    }
}