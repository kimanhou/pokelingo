import { FC, useState } from "react";
import Creature from "@/model/creature/creature";
import { QuizFailed, QuizOngoing, QuizSolved } from "@/model/quiz/quiz";
import QuizFactory from "@/model/quiz/quiz-factory";
import Ball from "@/assets/Ball";
import Button from "@/components/common/Button/Button";
import SideSheet from "@/components/common/SideSheet/SideSheet";
import styles from "./QuizView.module.scss";

interface IQuizProps {
    creatures: Creature[];
}

const QuizView: FC<IQuizProps> = (props) => {
    const [quiz, setQuiz] = useState(QuizFactory.build(props.creatures));
    const [input, setInput] = useState("");
    const [reviewMessage, setReviewMessage] = useState<JSX.Element | null>(
        null
    );
    const [isAnswerReviewSideSheetOpen, setIsAnswerReviewSideSheetOpen] =
        useState(false);
    const [canRetry, setCanRetry] = useState(true);
    const [canGoToNextRound, setCanGoToNextRound] = useState(false);
    const [canSeeAnswer, setCanSeeAnswer] = useState(true);

    const onAnswer = (quiz: QuizOngoing) => () => {
        if (quiz.isCorrectAnswer(input)) {
            setReviewMessage(<span>Great job ! :)</span>);
            setCanGoToNextRound(true);
            setCanRetry(false);
            setCanSeeAnswer(false);
            setIsAnswerReviewSideSheetOpen(true);
            setQuiz(quiz.toSolved());
        } else {
            setReviewMessage(<span>Oops, your answer is incorrect. :(</span>);
            setIsAnswerReviewSideSheetOpen(true);
            setQuiz(quiz.toFailed());
        }
    };

    const onGiveUp = (quiz: QuizFailed) => () => {
        setReviewMessage(
            <>
                <h2>{quiz.getRoundAnswer()}</h2>
                <span>{quiz.getRoundAnswerExplanation()}</span>
            </>
        );
        setCanRetry(false);
        setCanGoToNextRound(true);
        setCanSeeAnswer(false);
        setQuiz(quiz.toOngoing());
    };
    const onTryAgain = (quiz: QuizFailed) => () => {
        setAnswerState("");
        setInput("");
        setQuiz(quiz.toOngoing());
    };
    const onNext = (quiz: QuizSolved) => () => {
        setReviewMessage(null);
        setInput("");
        setIsAnswerReviewSideSheetOpen(false);
        setCanRetry(true);
        setCanGoToNextRound(false);
        setCanSeeAnswer(true);
        setQuiz(quiz.toNextQuestion());
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAnswer(quiz);
        }
    };

    return (
        <div className={styles.quizView}>
            <div
                className={styles.quizImageContainer}
                style={{ backgroundColor: quiz.getCreatureMainColor() }}
            >
                <Ball />
                <div
                    className={styles.quizCreatureImage}
                    style={{
                        backgroundImage: `url(${quiz.getImageUrl()})`,
                    }}
                />
            </div>

            <div
                className={styles.quizText}
                style={{ backgroundColor: quiz.getCreatureMainColor() }}
            >
                <h2>Who's that pokemon ?</h2>
                <input
                    className={styles.answerInput}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <Button
                    onClick={onAnswer}
                    text="Check"
                    disabled={!input}
                ></Button>
            </div>
            <SideSheet
                isVisible={isAnswerReviewSideSheetOpen}
                setIsVisible={setIsAnswerReviewSideSheetOpen}
                transitionFromBottom
                isMaxHeight30
            >
                <div className={styles.answerReviewContent}>
                    <div className={styles.message}>{reviewMessage}</div>
                    <div className={styles.buttonsContainer}>
                        {canSeeAnswer && (
                            <Button
                                text="See answer"
                                onClick={onGiveUp}
                                secondary
                            ></Button>
                        )}
                        {canRetry && (
                            <Button
                                text="Retry"
                                onClick={onResetAnswer}
                            ></Button>
                        )}
                        {canGoToNextRound && (
                            <Button text="Next" onClick={onNext}></Button>
                        )}
                    </div>
                </div>
            </SideSheet>
        </div>
    );
};

export default QuizView;
