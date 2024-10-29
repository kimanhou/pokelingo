export default interface Question {
    getIllustration : () => string;
    getAnswer : () => string;
    isCorrectAnswer : (input: string) => boolean;
}