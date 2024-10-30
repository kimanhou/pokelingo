import Creature from "@/model/creature/creature";
import CreatureQuestion from "@/model/quiz/creature-question";
import Quiz from "@/model/quiz/quiz";
import Round from "@/model/quiz/round";
import RandomIterator from "@/model/util/random-iterator";
import motivationalMessagesRepository from "./motivational-messages-repository";

class QuizFactory {
    build = (creatures : Creature[]) => {
        const questions = RandomIterator.build(creatures.map(CreatureQuestion.build));
        return new Quiz(
            [Round.build(questions.get())],
            questions,
            motivationalMessagesRepository.find()
        )
    }
}
export default new QuizFactory();