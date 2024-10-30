import RandomIterator from "@/model/util/random-iterator";
import MotivationalMessages from "./motivational-messages";

class MotivationalMessagesRepository {

    private readonly messages = new MotivationalMessages(
        // Success
        RandomIterator.build([
            "Great job !"
        ]),

        // Failure
        RandomIterator.build([
            "This one is a bit tricky."
        ]),
    );

    find = () => {
        return this.messages;
    }
}
export default new MotivationalMessagesRepository();