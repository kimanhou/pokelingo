import { FC } from "react";
import AvatarSpecs from "@/components/Learn/Details/Specs/AvatarSpecs";
import ImageContainer from "@/components/Learn/Details/ImageContainer/ImageContainer";
import AvatarImage from "@/components/Learn/Details/AvatarImage/AvatarImage";
import CreatureName from "@/components/Learn/Details/CreatureName/CreatureName";
import Creature from "@/data/creature";
import { DeviceType } from "@/ts/enums";
import styles from "./AvatarDetailsSmallDesktop.module.scss";

interface IAvatarDetailsSmallDesktopProps {
    creature: Creature;
    mainColor: string;
    search: string;
    setSearch: (search: string) => void;
    deviceType: DeviceType;
    randomize?: () => void;
    isCreatureCard?: boolean;
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
                deviceType={props.deviceType}
            />
            <AvatarImage creature={props.creature} isSmallDesktop />
            <AvatarSpecs
                types={props.creature.types}
                deviceType={props.deviceType}
                description={props.creature.ja.description}
                isCreatureCard={props.isCreatureCard}
            />
            <CreatureName name={props.creature.ja.name} color="var(--bg)" />
        </div>
    );
};

export default AvatarDetailsSmallDesktop;
