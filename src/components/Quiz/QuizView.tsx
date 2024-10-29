import Creature from "@/model/creature/creature";
import QuizFactory from "@/model/quiz/quiz-factory";
import { FC, useState } from "react";

interface IQuizProps {
    creatures : Creature[]
}

const QuizView: FC<IQuizProps> = (props) => {
    const [quiz, setQuiz] = useState(QuizFactory.build(props.creatures));
    const [input, setInput] = useState("");
    const [answerState, setAnswerState] = useState<string | null>(null);

    const onAnswer = () => {
        setQuiz(quiz => {
            if(quiz.isCorrectAnswer(input)){
                setAnswerState("Correct ! :)")
                return quiz.solveRound();
            }
            setAnswerState("Incorrect. :(")
            return quiz;
        });
    }
    const onGiveUp = () => {
        setQuiz(quiz => {
            setAnswerState("Gave up... T-T")
            return quiz.failRound();
        });
    }
    const onNext = () => {
        setQuiz(quiz => {
            setAnswerState("")
            setInput("")
            return quiz.nextRound();
        });
    }

    return (
        <div>
            <img src={quiz.getImageUrl()} />
            <div>
                <p>Who's that pokemon ?</p>
                <input value={input} onChange={e => setInput(e.target.value)}/>
            </div>
            <button onClick={onAnswer}>Answer</button>
            <button onClick={onGiveUp}>Give up</button>
            <p>{answerState}</p>
            {quiz.isRoundFailed() && <p>{quiz.getRoundAnswer()}</p>}
            {quiz.isRoundFinished() && <button onClick={onNext}>Next</button>}
        </div>
    );
};

export default QuizView;
