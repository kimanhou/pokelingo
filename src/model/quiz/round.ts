import Type from "@/model/util/type";
import Creature from "@/model/creature/creature";
import RoundStatus from "@/model/quiz/round-status";

export default class Round {
    constructor(
        private readonly creature : Creature,
        private readonly status : RoundStatus,
    ) {
    }

    getImageUrl = () => this.creature.getImageUrl();

    isOngoing = () => this.status === RoundStatus.ONGOING;

    isFinished = () => this.status !== RoundStatus.ONGOING;

    isSolved = () => this.status === RoundStatus.SOLVED;

    isFailed = () => this.status === RoundStatus.FAILED;

    getAnswer = () => this.creature.getName();

    isCorrectAnswer = (input : string) => {
        if(this.creature.matchesJaExact(input)){
            return true;
        }
        return false;
    }

    solve = () => {
        if(this.status !== RoundStatus.ONGOING){
            throw new Error(`Cannot change Round state from ${this.status.getValue()} to ${RoundStatus.SOLVED.getValue()}`)
        }
        return new Round(this.creature, RoundStatus.SOLVED);
    }

    fail = () => {
        if(this.status !== RoundStatus.ONGOING){
            throw new Error(`Cannot change Round state from ${this.status.getValue()} to ${RoundStatus.FAILED.getValue()}`)
        }
        return new Round(this.creature, RoundStatus.FAILED);
    }

    static build = (creature : Creature) => {
        return new Round(
            creature,
            RoundStatus.ONGOING
        )
    }

    static fromJSON = (json: any) => {
        return new Round(
            Type.of(Creature).read(json.creature),
            Type.of(RoundStatus).read(json.solved),
        )
    }

    static getEmpty = () => {
        return new Round(
            Type.of(Creature).getEmpty(),
            Type.of(RoundStatus).getEmpty(),
        )
    }
}