import Creature from "../creature/creature";
import CreatureQuestion from "./creature-question";
import QuestionIterator from "./question-iterator";
import Quiz from "./quiz";
import Round from "./round";

class QuizFactory {
    build = (creatures : Creature[]) => {
        const questions = QuestionIterator.build(creatures.map(CreatureQuestion.build));
        return new Quiz(
            [Round.build(questions.get())],
            questions
        )
    }
}
export default new QuizFactory();