import { FC, useRef, useState } from "react";
import Creature from "@/model/creature/creature";
import { QuizFailed, QuizOngoing, QuizSolved } from "@/model/quiz/quiz";
import QuizFactory from "@/model/quiz/quiz-factory";
import { useDeviceType } from "@/hooks/useIsMobile";
import { DeviceType } from "@/ts/enums";
import Button from "@/components/common/Button/Button";
import BottomNotification from "@/components/common/BottomNotification/BottomNotification";
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
    const isMobile = deviceType === DeviceType.MOBILE;

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
            setReviewMessage(
                <>
                    <img src={happy} />
                    <div>
                        <h2>Great job!</h2>
                        <span>Your answer is correct.</span>
                    </div>
                </>
            );
            setCanGoToNextRound(true);
            setIsAnswerReviewSideSheetOpen(true);
            setQuiz(quiz.toSolved());
        } else {
            setReviewMessage(
                <>
                    <img src={sad} />
                    <div>
                        <h2>Oops!</h2>
                        <span>Your answer is incorrect.</span>
                    </div>
                </>
            );
            setIsAnswerReviewSideSheetOpen(true);
            setQuiz(quiz.toFailed());
        }
    };

    const onGiveUp = (quiz: QuizFailed) => () => {
        setReviewMessage(
            <div>
                <h2>{quiz.getRoundAnswer()}</h2>
                <span>{quiz.getRoundAnswerExplanation()}</span>
            </div>
        );
        setCanGoToNextRound(true);
        return quiz.toOngoing();
    };
    const onTryAgain = (quiz: QuizFailed) => () => {
        setAnswerState("");
        setInput("");
        setQuiz(quiz.toOngoing());
    };

    const onNext = (quiz: QuizSolved) => {
        onResetAnswer();
        setQuiz(quiz.toNextQuestion());
    };

    const resetAnswerReviewSideSheet = () => {
        setReviewMessage(null);
        setCanGoToNextRound(false);
    };

    const onRetry = () => {
        setInput("");
        setIsAnswerReviewSideSheetOpen(false);
        resetAnswerReviewSideSheet();
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
                <div className={styles.quizTextContent}>
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
                        {!canGoToNextRound && (
                            <>
                                <Button
                                    text="See answer"
                                    onClick={onGiveUp}
                                    secondary
                                />
                                <Button text="Retry" onClick={onRetry} />
                            </>
                        )}
                        {canGoToNextRound && (
                            <Button
                                text="Next"
                                onClick={onNext}
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
