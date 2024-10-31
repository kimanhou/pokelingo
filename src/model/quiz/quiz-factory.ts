import Creature from "@/model/creature/creature";
import CreatureQuestion from "@/model/quiz/creature-question";
import Quiz, {QuizImpl} from "@/model/quiz/quiz";
import Round from "@/model/quiz/round";
import RandomIterator from "@/model/util/random-iterator";
import motivationalMessagesRepository from "./messages-repository";

class QuizFactory {
    build = (creatures : Creature[]) : Quiz => {
        const questions = RandomIterator.build(creatures.map(CreatureQuestion.build));
        return new QuizImpl(
            [Round.build(questions.get())],
            questions,
            motivationalMessagesRepository.find()
        )
    }
}
export default new QuizFactory();