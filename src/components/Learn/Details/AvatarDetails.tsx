import { FC, useEffect, useRef, useState } from "react";
import ImageContainer from "@/components/Learn/Details/ImageContainer/ImageContainer";
import AvatarSpecs from "@/components/Learn/Details/Specs/AvatarSpecs";
import AvatarDetailsSmallDesktop from "@/components/Learn/Details/AvatarDetailsSmallDesktop";
import AvatarImage from "@/components/Learn/Details/AvatarImage/AvatarImage";
import { getMainColor } from "@/ts/utils";
import { useIsLargeDesktop } from "@/hooks/useIsMobile";
import Creature from "@/data/creature";
import styles from "./AvatarDetails.module.scss";
import CreatureName from "./CreatureName/CreatureName";

interface IAvatarDetailsProps {
    creature: Creature;
    randomize: () => void;
    isSmallDesktop: boolean;
    isMobile: boolean;
    search: string;
    setSearch: (search: string) => void;
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
            {!props.isSmallDesktop && (
                <div
                    className={`${styles.avatarDetails} ${creatureCardClassName}`}
                    ref={avatarDetailsRef}
                    onClick={props.onClick}
                >
                    <ImageContainer
                        mainColor={mainColor}
                        name={props.creature.ja.name}
                        avatarId={props.creature.id}
                        randomize={props.randomize}
                        isMobile={props.isMobile}
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
                        description={props.creature.ja.description}
                        setAvatarSpecsHeight={setAvatarSpecsHeight}
                        isCreatureCard={props.isCreatureCard}
                        name={props.creature.ja.name}
                    />

                    {!props.isCreatureCard && (
                        <CreatureName
                            name={props.creature.ja.name}
                            color="var(--bg)"
                        />
                    )}
                </div>
            )}
            {props.isSmallDesktop && (
                <AvatarDetailsSmallDesktop
                    creature={props.creature}
                    mainColor={mainColor}
                    randomize={props.randomize}
                    search={props.search}
                    setSearch={props.setSearch}
                    isMobile={props.isMobile}
                />
            )}
        </>
    );
};

export default AvatarDetails;
