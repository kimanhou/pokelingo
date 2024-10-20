import { FC, useEffect, useRef, useState } from "react";
import ImageContainer from "@/components/EditAvatar/Details/ImageContainer/ImageContainer";
import AvatarSpecs from "@/components/EditAvatar/Details/Specs/AvatarSpecs";
import AvatarDetailsSmallDesktop from "@/components/EditAvatar/Details/AvatarDetailsSmallDesktop";
import AvatarImage from "@/components/EditAvatar/Details/AvatarImage/AvatarImage";
import { getMainColor } from "@/ts/utils";
import { useIsLargeDesktop } from "@/hooks/useIsMobile";
import Creature from "@/data/creature";
import styles from "./AvatarDetails.module.scss";

interface IAvatarDetailsProps {
    creature: Creature;
    randomize: () => void;
    isSmallDesktop: boolean;
    isMobile: boolean;
    search: string;
    setSearch: (search: string) => void;
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
                <div className={styles.avatarDetails} ref={avatarDetailsRef}>
                    <ImageContainer
                        mainColor={mainColor}
                        name={props.creature.ja.name}
                        avatarId={props.creature.id}
                        randomize={props.randomize}
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
                    />
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
