import { FC } from "react";
import { Avatar } from "@/types";
import AvatarSpecs from "@/components/EditAvatar/Details/Specs/AvatarSpecs";
import ImageContainer from "@/components/EditAvatar/Details/ImageContainer/ImageContainer";
import AvatarImage from "@/components/EditAvatar/Details/AvatarImage/AvatarImage";
import styles from "./AvatarDetailsSmallDesktop.module.scss";

interface IAvatarDetailsSmallDesktopProps {
  avatar: Avatar;
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
        name={props.avatar.name}
        avatarId={props.avatar.id}
        randomize={props.randomize}
        search={props.search}
        setSearch={props.setSearch}
        isSmallDesktop
      />
      <AvatarImage avatar={props.avatar} isSmallDesktop />
      <AvatarSpecs
        types={props.avatar.types}
        height={props.avatar.height}
        weight={props.avatar.weight}
        isSmallDesktop
        isMobile={props.isMobile}
      />
    </div>
  );
};

export default AvatarDetailsSmallDesktop;
