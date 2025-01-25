import { FC, useRef, useState } from "react";
import Creature from "@/model/creature/creature";
import { QuizFailed, QuizOngoing, QuizSolved } from "@/model/quiz/quiz";
import QuizFactory from "@/model/quiz/quiz-factory";
import { useDeviceType } from "@/hooks/useMedia";
import { isMobile as isMobileFunc } from "@/ts/utils";
import Button from "@/components/common/Button/Button";
import BottomNotification from "@/components/common/BottomNotification/BottomNotification";
import HomeButton from "@/components/common/HomeButton/HomeButton";
import { Footer } from "@/components/Footer/Footer";
import Ball from "@/assets/Ball";
import happy from "@/assets/happy_eevee.png";
import sad from "@/assets/sad_charmander.png";
import styles from "./QuizView.module.scss";

interface IQuizProps {
    creatures: Creature[];
}

const QuizView: FC<IQuizProps> = (props) => {
    const deviceType = useDeviceType();
    const isMobile = isMobileFunc(deviceType);

    const answerReviewContentRef = useRef<HTMLDivElement>(null);
    const [quiz, setQuiz] = useState(QuizFactory.build(props.creatures));
    const [input, setInput] = useState("");
    const [reviewMessage, setReviewMessage] = useState<JSX.Element | null>(
        null
    );
    const [isAnswerReviewSideSheetOpen, setIsAnswerReviewSideSheetOpen] =
        useState(false);
    const [canGoToNextRound, setCanGoToNextRound] = useState(false);

    const onAnswer = (quiz: QuizOngoing) => {
        if (quiz.isCorrectAnswer(input)) {
            const solvedQuiz = quiz.toSolved();
            setReviewMessage(
                <>
                    <img src={happy} />
                    <div>
                        <h2>Correct!</h2>
                        <span>{solvedQuiz.getMessage()}</span>
                    </div>
                </>
            );
            setCanGoToNextRound(true);
            setIsAnswerReviewSideSheetOpen(true);
            setQuiz(solvedQuiz);
        } else {
            const failedQuiz = quiz.toFailed();
            setReviewMessage(
                <>
                    <img src={sad} />
                    <div>
                        <h2>Incorrect.</h2>
                        <span>{failedQuiz.getMessage()}</span>
                    </div>
                </>
            );
            setIsAnswerReviewSideSheetOpen(true);
            setQuiz(failedQuiz);
        }
    };

    const onSeeAnswer = (quiz: QuizFailed) => () => {
        setReviewMessage(
            <div>
                <h2>{quiz.getAnswer()}</h2>
                <span>{quiz.getAnswerExplanation()}</span>
            </div>
        );
        setCanGoToNextRound(true);
    };

    const onRetry = (quiz: QuizFailed) => () => {
        setInput("");
        setIsAnswerReviewSideSheetOpen(false);
        setQuiz(quiz.toOngoing());
    };

    const onNext = (quiz: QuizSolved | QuizFailed) => {
        setInput("");
        setIsAnswerReviewSideSheetOpen(false);
        setQuiz(quiz.toNextQuestion());
    };

    const resetAnswerReviewSideSheet = () => {
        setReviewMessage(null);
        setCanGoToNextRound(false);
        if (quiz.isFailed()) {
            setQuiz(quiz.toOngoing());
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && quiz.isOngoing()) {
            onAnswer(quiz);
        }
    };

    const onBottomNotificationKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (isAnswerReviewSideSheetOpen && e.key === "Enter") {
            if (quiz.isFailed() && !canGoToNextRound) {
                onRetry(quiz)();
            }
            if (quiz.isSolved()) {
                onNext(quiz);
            }
        }
    };

    return (
        <div
            className={styles.quizView}
            onKeyDown={onBottomNotificationKeyDown}
        >
            <HomeButton className={styles.homeButton} />
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
                <div className={styles.quizTextContent}>
                    <h2>Who's that pokemon ?</h2>
                    <input
                        className={styles.answerInput}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                    <Button
                        onClick={() => {
                            if (quiz.isOngoing()) {
                                onAnswer(quiz);
                            }
                        }}
                        text="Check"
                        disabled={!input}
                        expand={isMobile}
                        className={styles.checkButton}
                        secondary
                    ></Button>
                </div>
                <Footer />
            </div>

            <BottomNotification
                isVisible={isAnswerReviewSideSheetOpen}
                setIsVisible={setIsAnswerReviewSideSheetOpen}
                onExit={resetAnswerReviewSideSheet}
            >
                <div
                    className={styles.answerReviewContent}
                    ref={answerReviewContentRef}
                >
                    <div className={styles.message}>{reviewMessage}</div>
                    <div className={styles.buttonsContainer}>
                        {quiz.isFailed() && !canGoToNextRound && (
                            <>
                                <Button
                                    text="See answer"
                                    onClick={onSeeAnswer(quiz)}
                                    secondary
                                />
                                <Button text="Retry" onClick={onRetry(quiz)} />
                            </>
                        )}
                        {((quiz.isFailed() && canGoToNextRound) ||
                            quiz.isSolved()) && (
                            <Button
                                text="Next"
                                onClick={() => onNext(quiz)}
                                expand={isMobile}
                            />
                        )}
                    </div>
                </div>
            </BottomNotification>
        </div>
    );
};

export default QuizView;
