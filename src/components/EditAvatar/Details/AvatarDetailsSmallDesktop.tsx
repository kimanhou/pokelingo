import { FC } from "react";
import { Avatar } from "@/types";
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
        isSmallDesktop
      />
      <AvatarImage creature={props.creature} isSmallDesktop />
      <AvatarSpecs
        types={props.creature.types}
        height={props.creature.height}
        weight={props.creature.weight}
        isSmallDesktop
        isMobile={props.isMobile}
      />
    </div>
  );
};

export default AvatarDetailsSmallDesktop;
