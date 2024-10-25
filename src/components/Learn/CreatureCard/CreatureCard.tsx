import { Dispatch, FC, SetStateAction } from "react";
import Creature from "@/model/creature/creature";
import ModalDialog from "@/components/common/ModalDialog/ModalDialog";
import AvatarDetails from "../Details/AvatarDetails";
import styles from "./CreatureCard.module.scss";

interface ICreatureCardProps {
    creature: Creature | null;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    previousCreature?: Creature | null;
    nextCreature?: Creature | null;
}

const CreatureCard: FC<ICreatureCardProps> = ({
    creature,
    isOpen,
    setIsOpen,
    previousCreature,
    nextCreature,
}: ICreatureCardProps) => {
    return (
        <ModalDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeOnClickOutside
            className={styles.creatureCardModalDialog}
        >
            <div className={styles.creatureCardWrapper}>
                {previousCreature && (
                    <AvatarDetails
                        creature={previousCreature}
                        search=""
                        setSearch={(value: string) => {}}
                        isCreatureCard
                        onClick={() => setIsOpen(false)}
                    />
                )}
                <AvatarDetails
                    creature={creature || Creature.getEmpty()}
                    search=""
                    setSearch={(value: string) => {}}
                    isCreatureCard
                    onClick={() => setIsOpen(false)}
                />
                {nextCreature && (
                    <AvatarDetails
                        creature={nextCreature}
                        search=""
                        setSearch={(value: string) => {}}
                        isCreatureCard
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </div>
        </ModalDialog>
    );
};

export default CreatureCard;
