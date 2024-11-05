import creatureRepository from '@/model/creature/creature-repository';
import Reading from '@/model/creature/reading';
import { QuizOngoing } from '@/model/quiz/quiz';
import QuizFactory from '@/model/quiz/quiz-factory';
import RandomIterator from '@/model/util/random-iterator';

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

const randomIteratorTest = () => {
    console.log("--- randomIteratorTest ---");
    const array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
    const occurenceArray = [];
    for(let i=0; i<array.length; i++){
        occurenceArray.push(0);
    }
    for(let i=0; i<1000; i++){
        let iterator = RandomIterator.build(array);
        let index = 0;
        while(iterator.get() !== "a"){
            index++;
            iterator = iterator.next();
        }
        occurenceArray[index]++;
    }
    console.log(occurenceArray);
}

randomIteratorTest();
// questionOrderTest();
// enumTest();
