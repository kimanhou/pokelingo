import Creature from "@/model/creature/creature";
import CreatureQuestion from "@/model/quiz/creature-question";
import QuestionIterator from "@/model/quiz/question-iterator";
import Quiz from "@/model/quiz/quiz";
import Round from "@/model/quiz/round";

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