import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { getMainColor } from "@/ts/utils";
import Creature from "@/model/creature/creature";
import { DeviceType } from "@/ts/enums";
import { useDeviceType } from "@/hooks/useIsMobile";
import styles from "./AvatarOption.module.scss";

interface IAvatarOptionProps {
    creature: Creature;
    setDisplayedSelectedCreature: Dispatch<SetStateAction<Creature>>;
    displayedSelectedCreature: Creature;
    isDisabled: boolean;
    onClick: () => void;
}

const AvatarOption: FC<IAvatarOptionProps> = (props) => {
    const [isSelected, setIsSelected] = useState(
        props.displayedSelectedCreature.getImageUrl() === props.creature.getImageUrl()
    );
    const deviceType = useDeviceType();

    const isSelectedClassName = isSelected ? styles.selected : "";
    const isDisabledClassName = props.isDisabled ? styles.disabled : "";
    const isSmallDesktopClassName =
        deviceType === DeviceType.SMALL_DESKTOP ? styles.smallDesktop : "";
    const mainColor = getMainColor(props.creature);
    const avatarHtmlId =
        props.creature.getId() > 0
            ? props.creature.getId()
            : props.creature.getId() * -1 + 151;

    const onClick = () => {
        if (!props.isDisabled) {
            props.setDisplayedSelectedCreature(props.creature);
            props.onClick();
        }
    };

    useEffect(() => {
        setIsSelected(
            props.displayedSelectedCreature.getImageUrl() === props.creature.getImageUrl()
        );
    }, [props.displayedSelectedCreature]);

    return (
        <div
            className={`${styles.avatarOptionWrapper} ${isSelectedClassName} ${isDisabledClassName} ${isSmallDesktopClassName}`}
            style={{
                outlineColor: mainColor,
                color: mainColor,
            }}
            onClick={onClick}
            id={`avatar-${avatarHtmlId}`}
        >
            <div
                className={styles.avatarOption}
                style={{
                    backgroundImage: `url(${props.creature.getImageUrl()})`,
                }}
            ></div>
        </div>
    );
};

export default AvatarOption;
