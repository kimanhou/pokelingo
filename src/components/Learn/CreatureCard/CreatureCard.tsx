import { Dispatch, FC, SetStateAction } from "react";
import Creature from "@/data/creature";
import ModalDialog from "@/components/common/ModalDialog/ModalDialog";
import styles from "./CreatureCard.module.scss";
import AvatarDetails from "../Details/AvatarDetails";
import { DeviceType } from "@/ts/enums";

interface ICreatureCardProps {
    creature: Creature | null;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    deviceType: DeviceType;
}

const CreatureCard: FC<ICreatureCardProps> = ({
    creature,
    isOpen,
    setIsOpen,
    deviceType,
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
                search=""
                setSearch={(value: string) => {}}
                deviceType={deviceType}
                isCreatureCard
                onClick={() => setIsOpen(false)}
            />
        </ModalDialog>
    );
};

export default CreatureCard;
