import { FC } from "react";
import Ball from "@/assets/Ball";
import Creature from "@/model/creature/creature";
import styles from "./AvatarImage.module.scss";

interface IAvatarImageProps {
    creature: Creature;
    isSmallDesktop?: boolean;
    imageOpacity?: number;
    avatarDetailsHeight?: number;
    avatarSpecsHeight?: number;
    isCreatureCard?: boolean;
}

const AvatarImage: FC<IAvatarImageProps> = (props) => {
    const getBottom = () => {
        if (props.isSmallDesktop) {
            if (props.creature.getId() > 0) {
                return "16px";
            } else {
                return "0";
            }
        } else if (
            props.avatarDetailsHeight !== undefined &&
            props.avatarSpecsHeight !== undefined
        ) {
            if (props.creature.getId() < 0) {
                return Math.min(
                    props.avatarDetailsHeight * 0.3,
                    props.avatarSpecsHeight
                );
            }
            return Math.max(
                props.avatarDetailsHeight * 0.3 - 40,
                props.avatarSpecsHeight - 40
            );
        }

        return "30%";
    };

    const bottom = getBottom();
    const opacity = !props.isSmallDesktop ? props.imageOpacity : "unset";

    const smallDesktopClassName = props.isSmallDesktop
        ? styles.smallDesktop
        : "";

    return (
        <>
            <Ball onRight={props.isCreatureCard} />
            <div
                className={`${styles.avatarImage} ${smallDesktopClassName}`}
                style={{
                    backgroundImage: `url(${props.creature.getImageUrl()})`,
                    backgroundPositionY:
                        props.creature.getId() < 0 ? "bottom" : "center",
                    bottom,
                    opacity,
                }}
            />
        </>
    );
};

export default AvatarImage;
