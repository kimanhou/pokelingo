import RandomIterator from "@/model/util/random-iterator";
import Messages from "./messages";

class MessagesRepository {

    private readonly messages = new Messages(
        // Success
        RandomIterator.build([
            "Great job !",
            "You're on fire !",
            "Gotta learn 'em all !",
            "Keep it up !",
            "Impressive !",
            "Awesome job !",
            "You nailed it !",
            "Brilliant !",
            "Spot on !",
            "Perfect answer !"
        ]),

        // Failure
        RandomIterator.build([
            "Don’t worry, every attempt brings you closer !",
            "Great effort! Keep going—you’re learning more each time !",
            "You almost had it !",
            "You’re getting closer with each try. Keep it up !",
            "You’re doing great ! Remember, practice makes progress !",
            "Learning is a journey, and you’re right on track !"
        ]),
    );

    find = () => {
        return this.messages;
    }
}
export default new MessagesRepository();