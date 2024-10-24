import { FC } from "react";
import AvatarSpecs from "@/components/Learn/Details/Specs/AvatarSpecs";
import ImageContainer from "@/components/Learn/Details/ImageContainer/ImageContainer";
import AvatarImage from "@/components/Learn/Details/AvatarImage/AvatarImage";
import CreatureName from "@/components/Learn/Details/CreatureName/CreatureName";
import Creature from "@/model/creature";
import { useDeviceType } from "@/hooks/useIsMobile";
import styles from "./AvatarDetailsSmallDesktop.module.scss";

interface IAvatarDetailsSmallDesktopProps {
    creature: Creature;
    mainColor: string;
    search: string;
    setSearch: (search: string) => void;
    randomize?: () => void;
    isCreatureCard?: boolean;
}

const AvatarDetailsSmallDesktop: FC<IAvatarDetailsSmallDesktopProps> = (
    props: IAvatarDetailsSmallDesktopProps
) => {
    const deviceType = useDeviceType();

    return (
        <div
            className={styles.avatarDetails}
            style={{ backgroundColor: props.mainColor }}
        >
            <ImageContainer
                mainColor={props.mainColor}
                name={props.creature.getName()}
                avatarId={props.creature.id}
                randomize={props.randomize}
                search={props.search}
                setSearch={props.setSearch}
            />
            <AvatarImage creature={props.creature} isSmallDesktop />
            <AvatarSpecs
                types={props.creature.types}
                deviceType={deviceType}
                description={props.creature.getDescription()}
                isCreatureCard={props.isCreatureCard}
                mainColor={props.mainColor}
            />
            <CreatureName name={props.creature.getName()} color="var(--bg)" />
        </div>
    );
};

export default AvatarDetailsSmallDesktop;
