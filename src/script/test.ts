import creatureRepository from '@/model/creature/creature-repository';
import Reading from '@/model/creature/reading';
import QuizFactory from '@/model/quiz/quiz-factory';

const questionOrderTest = () => {
    console.log("--- questionOrderTest ---");
    let quiz = QuizFactory.build(creatureRepository.findAll());
    for(let i=0; i<25; i++){
        console.log(quiz.getRoundAnswer());
        quiz = quiz.nextRound();
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
