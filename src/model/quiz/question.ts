export default interface Question {
    getIllustration: () => string;
    getMainColor: () => string;
    getAnswer: () => string;
    getExplanation: () => string;
    isCorrectAnswer: (input: string) => boolean;
}
