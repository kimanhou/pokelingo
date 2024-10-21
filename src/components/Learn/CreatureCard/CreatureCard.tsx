import { Dispatch, FC, SetStateAction } from "react";
import Creature from "@/data/creature";
import ModalDialog from "@/components/common/ModalDialog/ModalDialog";
import styles from "./CreatureCard.module.scss";
import AvatarDetails from "../Details/AvatarDetails";

interface ICreatureCardProps {
    creature: Creature | null;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreatureCard: FC<ICreatureCardProps> = ({
    creature,
    isOpen,
    setIsOpen,
}: ICreatureCardProps) => {
    return (
        <ModalDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeOnClickOutside
            className={styles.creatureCard}
        >
            <AvatarDetails
                creature={creature || Creature.getDefaultValue()}
                randomize={() => {}}
                isSmallDesktop={false}
                search=""
                setSearch={(value: string) => {}}
                isMobile
                isCreatureCard
                onClick={() => setIsOpen(false)}
            />
        </ModalDialog>
    );
};

export default CreatureCard;
