import creatureRepository from '@/model/creature/creature-repository';
import Reading from '@/model/creature/reading';
import { QuizOngoing } from '@/model/quiz/quiz';
import QuizFactory from '@/model/quiz/quiz-factory';

const questionOrderTest = () => {
    console.log("--- questionOrderTest ---");
    let quiz = QuizFactory.build(creatureRepository.findAll()) as QuizOngoing;
    for(let i=0; i<25; i++){
        console.log(quiz.toFailed().getAnswer());
        quiz = quiz.toSolved().toNextQuestion();
    }
}

const enumTest = () => {
    console.log("--- enumTest ---");
    console.log(Reading)
    console.log(Object.keys(Reading))
    console.log(Object.values(Reading))
    console.log(Object.values(Reading).filter(x => x instanceof Reading))
}

questionOrderTest();
// enumTest();
