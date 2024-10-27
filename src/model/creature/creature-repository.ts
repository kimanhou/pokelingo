import rootRepository from "../root/root-repository";

class CreatureRepository{
    findAll = () => {
        return rootRepository.find().getCreatures();
    }

    findGen1 = () => {
        return this.findAll().filter(x => x.isGen1());
    }
}
export default new CreatureRepository();