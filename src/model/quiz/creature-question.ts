import Type from "@/model/util/type";
import Creature from "@/model/creature/creature";
import Question from "./question";

export default class CreatureQuestion implements Question {
    constructor(
        private readonly creature : Creature
    ) {
    }

    isCorrectAnswer = (input: string) => this.creature.matchesJaExact(input);

    getIllustration = () => this.creature.getImageUrl();

    getAnswer = () => this.creature.getName();

    static build = (creature : Creature) => {
        return new CreatureQuestion(
            creature
        );
    }

    static fromJSON = (json: any) => {
        return new CreatureQuestion(
            Type.of(Creature).read(json.creature),
        )
    }

    static getEmpty = () => {
        return new CreatureQuestion(
            Type.of(Creature).getEmpty(),
        )
    }
}