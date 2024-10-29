import Type from "@/model/util/type";
import Creature from "@/model/creature/creature";
import Question from "@/model/quiz/question";

export default class CreatureQuestion implements Question {
    constructor(private readonly creature: Creature) {}

    isCorrectAnswer = (input: string) => this.creature.matchesJaExact(input);

    getIllustration = () => this.creature.getImageUrl();

    getMainColor = () => this.creature.getMainColor();

    getAnswer = () => this.creature.getName();

    getExplanation = () => this.creature.getDescription();

    static build = (creature: Creature) => {
        return new CreatureQuestion(creature);
    };

    static fromJSON = (json: any) => {
        return new CreatureQuestion(Type.of(Creature).read(json.creature));
    };

    static getEmpty = () => {
        return new CreatureQuestion(Type.of(Creature).getEmpty());
    };
}
