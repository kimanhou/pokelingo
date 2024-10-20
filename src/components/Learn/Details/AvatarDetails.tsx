import { FC, useEffect, useRef, useState } from "react";
import ImageContainer from "@/components/Learn/Details/ImageContainer/ImageContainer";
import AvatarSpecs from "@/components/Learn/Details/Specs/AvatarSpecs";
import AvatarDetailsSmallDesktop from "@/components/Learn/Details/AvatarDetailsSmallDesktop";
import AvatarImage from "@/components/Learn/Details/AvatarImage/AvatarImage";
import CreatureName from "@/components/Learn/Details/CreatureName/CreatureName";
import {
    getMainColor,
    isMediumDesktopOrBigger as isMediumDesktopOrBiggerFunc,
    isMobileCreatureCard as isMobileCreatureCardFunc,
} from "@/ts/utils";
import { useIsLargeDesktop } from "@/hooks/useIsMobile";
import Creature from "@/data/creature";
import { DeviceType } from "@/ts/enums";
import styles from "./AvatarDetails.module.scss";

interface IAvatarDetailsProps {
    creature: Creature;
    randomize: () => void;
    search: string;
    setSearch: (search: string) => void;
    deviceType: DeviceType;
    isCreatureCard?: boolean;
    onClick?: () => void;
}

const AvatarDetails: FC<IAvatarDetailsProps> = (props) => {
    const avatarDetailsRef = useRef<HTMLDivElement>(null);
    const isLargeDesktop = useIsLargeDesktop();

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

    const isMediumDesktopOrBigger = isMediumDesktopOrBiggerFunc(
        props.deviceType
    );
    const isMobileCreatureCard = isMobileCreatureCardFunc({
        deviceType: props.deviceType,
        isCreatureCard: props.isCreatureCard || false,
    });

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
                >
                    <ImageContainer
                        mainColor={mainColor}
                        name={props.creature.getName()}
                        avatarId={props.creature.id}
                        randomize={props.randomize}
                        deviceType={props.deviceType}
                        isCreatureCard={props.isCreatureCard}
                    />
                    <AvatarImage
                        creature={props.creature}
                        imageOpacity={imageOpacity}
                        avatarDetailsHeight={avatarDetailsHeight}
                        avatarSpecsHeight={avatarSpecsHeight}
                        isLargeDesktop={isLargeDesktop}
                    />
                    <AvatarSpecs
                        types={props.creature.types}
                        description={props.creature.getDescription()}
                        setAvatarSpecsHeight={setAvatarSpecsHeight}
                        isCreatureCard={props.isCreatureCard}
                        name={props.creature.getName()}
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
                    deviceType={props.deviceType}
                    isCreatureCard={props.isCreatureCard}
                />
            )}
        </>
    );
};

export default AvatarDetails;
