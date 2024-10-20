import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { getMainColor } from "@/ts/utils";
import styles from "./AvatarOption.module.scss";
import Creature from "@/data/creature";

interface IAvatarOptionProps {
    creature: Creature;
    setDisplayedSelectedCreature: Dispatch<SetStateAction<Creature>>;
    // isSelected: boolean;
    displayedSelectedCreature: Creature;
    isDisabled: boolean;
    isSmallDesktop: boolean;
    onClick: () => void;
}

const AvatarOption: FC<IAvatarOptionProps> = (props) => {
    const [isSelected, setIsSelected] = useState(
        props.displayedSelectedCreature.imageUrl === props.creature.imageUrl
    );
    const isSelectedClassName = isSelected ? styles.selected : "";
    const isDisabledClassName = props.isDisabled ? styles.disabled : "";
    const isSmallDesktopClassName = props.isSmallDesktop
        ? styles.smallDesktop
        : "";
    const mainColor = getMainColor(props.creature);
    const avatarHtmlId =
        props.creature.id > 0
            ? props.creature.id
            : props.creature.id * -1 + 151;

    const onClick = () => {
        if (!props.isDisabled) {
            props.setDisplayedSelectedCreature(props.creature);
            props.onClick();
        }
    };

    useEffect(() => {
        setIsSelected(
            props.displayedSelectedCreature.imageUrl === props.creature.imageUrl
        );
    }, [props.displayedSelectedCreature]);

    return (
        <div
            className={`${styles.avatarOptionWrapper} ${isSelectedClassName} ${isDisabledClassName} ${isSmallDesktopClassName}`}
            style={{ outlineColor: mainColor }}
            onClick={onClick}
            id={`avatar-${avatarHtmlId}`}
        >
            <div
                className={styles.avatarOption}
                style={{ backgroundImage: `url(${props.creature.imageUrl})` }}
            ></div>
        </div>
    );
};

export default AvatarOption;
