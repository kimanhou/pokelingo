import Creature from "@/model/creature/creature";
import { QuizFailed, QuizOngoing, QuizSolved } from "@/model/quiz/quiz";
import QuizFactory from "@/model/quiz/quiz-factory";
import { FC, useState } from "react";

interface IQuizProps {
    creatures : Creature[]
}

const QuizView: FC<IQuizProps> = (props) => {
    const [quiz, setQuiz] = useState(QuizFactory.build(props.creatures));
    const [input, setInput] = useState("");
    const [answerState, setAnswerState] = useState<string | null>(null);

    const onAnswer = (quiz : QuizOngoing) => () => {
        if(quiz.isCorrectAnswer(input)){
            setAnswerState("Correct ! :)")
            setQuiz(quiz.toSolved());
        } else {
            setAnswerState("Incorrect. :(")
            setQuiz(quiz.toFailed());
        }
    }
    const onGiveUp = (quiz: QuizFailed) => () => {
        setAnswerState("Gave up... T-T")
        setQuiz(quiz.toNextQuestion());
    }
    const onNext = (quiz: QuizFailed | QuizSolved) => () => {
        setAnswerState("")
        setInput("")
        setQuiz(quiz.toNextQuestion());
    }

    return (
        <div>
            <img src={quiz.getImageUrl()} />
            <div>
                <p>Who's that pokemon ?</p>
                <input value={input} onChange={e => setInput(e.target.value)}/>
            </div>
            {quiz.isOngoing() && <button onClick={onAnswer(quiz)}>Answer</button>}
            {quiz.isFailed() && <button onClick={onGiveUp(quiz)}>Give up</button>}
            <p>{answerState}</p>
            {quiz.isFailed() && <p>{quiz.getAnswer()}</p>}
            {(quiz.isFailed() || quiz.isSolved()) && <button onClick={onNext(quiz)}>Next</button>}
        </div>
    );
};

export default QuizView;
