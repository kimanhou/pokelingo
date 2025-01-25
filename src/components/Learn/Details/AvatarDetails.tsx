import { FC, useEffect, useRef, useState } from "react";
import ImageContainer from "@/components/Learn/Details/ImageContainer/ImageContainer";
import AvatarSpecs from "@/components/Learn/Details/Specs/AvatarSpecs";
import AvatarDetailsSmallDesktop from "@/components/Learn/Details/AvatarDetailsSmallDesktop";
import AvatarImage from "@/components/Learn/Details/AvatarImage/AvatarImage";
import CreatureName from "@/components/Learn/Details/CreatureName/CreatureName";
import CloseIcon from "@/assets/CloseIcon";
import {
    getMainColor,
    isMediumDesktopOrBigger as isMediumDesktopOrBiggerFunc,
    isMobileCreatureCard as isMobileCreatureCardFunc,
} from "@/ts/utils";
import { useDeviceType } from "@/hooks/useMedia";
import Creature from "@/model/creature/creature";
import styles from "./AvatarDetails.module.scss";

interface IAvatarDetailsProps {
    creature: Creature;
    randomize?: () => void;
    search: string;
    setSearch: (search: string) => void;
    isCreatureCard?: boolean;
    onClick?: () => void;
    closeCreatureCard?: () => void;
}

const AvatarDetails: FC<IAvatarDetailsProps> = (props) => {
    const avatarDetailsRef = useRef<HTMLDivElement>(null);

    const [imageOpacity, setImageOpacity] = useState<number>(0);
    const [avatarDetailsHeight, setAvatarDetailsHeight] = useState<
        number | undefined
    >(undefined);
    const [avatarSpecsHeight, setAvatarSpecsHeight] = useState<
        number | undefined
    >(undefined);

    const mainColor = getMainColor(props.creature);
    const creatureCardClassName = props.isCreatureCard
        ? styles.creatureCard
        : "";

    const deviceType = useDeviceType();
    const isMediumDesktopOrBigger = isMediumDesktopOrBiggerFunc(deviceType);
    const isMobileCreatureCard = isMobileCreatureCardFunc({
        deviceType,
        isCreatureCard: props.isCreatureCard || false,
    });

    const close = () => {
        if (isMobileCreatureCard && props.closeCreatureCard) {
            props.closeCreatureCard();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setImageOpacity(100);
            if (avatarDetailsRef.current) {
                setAvatarDetailsHeight(avatarDetailsRef.current.clientHeight);
            }
        }, 600); // transition duration of side sheet from bottom + transition duration of Image Container + transition duration of Avatar Specs
    }, []);

    return (
        <>
            {(isMediumDesktopOrBigger || isMobileCreatureCard) && (
                <div
                    className={`${styles.avatarDetails} ${creatureCardClassName}`}
                    ref={avatarDetailsRef}
                    onClick={props.onClick}
                    id={`avatar-details-id-${props.creature.getId()}`}
                >
                    {isMobileCreatureCard && (
                        <button onClick={close} className={styles.closeButton}>
                            <CloseIcon color="rgba(255, 255, 255, 0.3)" />
                        </button>
                    )}
                    <ImageContainer
                        mainColor={mainColor}
                        name={props.creature.getName()}
                        avatarId={props.creature.getId()}
                        randomize={props.randomize}
                        isCreatureCard={props.isCreatureCard}
                    />
                    <AvatarImage
                        creature={props.creature}
                        imageOpacity={imageOpacity}
                        avatarDetailsHeight={avatarDetailsHeight}
                        avatarSpecsHeight={avatarSpecsHeight}
                        isCreatureCard={props.isCreatureCard}
                    />
                    <AvatarSpecs
                        types={props.creature.getTypes()}
                        description={props.creature.getDescription()}
                        setAvatarSpecsHeight={setAvatarSpecsHeight}
                        isCreatureCard={props.isCreatureCard}
                        name={props.creature.getName()}
                        mainColor={mainColor}
                    />
                    {!props.isCreatureCard && (
                        <CreatureName
                            name={props.creature.getName()}
                            color="var(--bg)"
                        />
                    )}
                </div>
            )}
            {!isMediumDesktopOrBigger && !props.isCreatureCard && (
                <AvatarDetailsSmallDesktop
                    creature={props.creature}
                    mainColor={mainColor}
                    randomize={props.randomize}
                    search={props.search}
                    setSearch={props.setSearch}
                    isCreatureCard={props.isCreatureCard}
                />
            )}
        </>
    );
};

export default AvatarDetails;
