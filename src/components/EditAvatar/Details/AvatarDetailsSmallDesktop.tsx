import { FC } from "react";
import AvatarSpecs from "@/components/EditAvatar/Details/Specs/AvatarSpecs";
import ImageContainer from "@/components/EditAvatar/Details/ImageContainer/ImageContainer";
import AvatarImage from "@/components/EditAvatar/Details/AvatarImage/AvatarImage";
import styles from "./AvatarDetailsSmallDesktop.module.scss";
import Creature from "@/data/creature";

interface IAvatarDetailsSmallDesktopProps {
    creature: Creature;
    mainColor: string;
    search: string;
    setSearch: (search: string) => void;
    isMobile: boolean;
    randomize?: () => void;
}

const AvatarDetailsSmallDesktop: FC<IAvatarDetailsSmallDesktopProps> = (
    props: IAvatarDetailsSmallDesktopProps
) => {
    return (
        <div
            className={styles.avatarDetails}
            style={{ backgroundColor: props.mainColor }}
        >
            <ImageContainer
                mainColor={props.mainColor}
                name={props.creature.ja.name}
                avatarId={props.creature.id}
                randomize={props.randomize}
                search={props.search}
                setSearch={props.setSearch}
                isMobile={props.isMobile}
                isSmallDesktop
            />
            <AvatarImage creature={props.creature} isSmallDesktop />
            <AvatarSpecs
                types={props.creature.types}
                isSmallDesktop
                isMobile={props.isMobile}
                description={props.creature.ja.description}
            />
            <div className={styles.nameContainer}>
                <h2 className={styles.avatarName}>{props.creature.ja.name}</h2>
            </div>
        </div>
    );
};

export default AvatarDetailsSmallDesktop;
