import Root from "./root";
import data from "@/data/data.json"

class RootRepository {
    private readonly root = Root.fromJSON(data)
    
    find = () => {
        return this.root;
    }
}
export default new RootRepository();