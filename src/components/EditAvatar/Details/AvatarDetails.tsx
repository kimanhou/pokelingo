import { FC, useEffect, useRef, useState } from "react";
import ImageContainer from "@/components/EditAvatar/Details/ImageContainer/ImageContainer";
import AvatarSpecs from "@/components/EditAvatar/Details/Specs/AvatarSpecs";
import AvatarDetailsSmallDesktop from "@/components/EditAvatar/Details/AvatarDetailsSmallDesktop";
import AvatarImage from "@/components/EditAvatar/Details/AvatarImage/AvatarImage";
import { Avatar } from "@/types";
import { getMainColor } from "@/ts/utils";
import { useIsLargeDesktop } from "@/hooks/useIsMobile";
import styles from "./AvatarDetails.module.scss";

interface IAvatarDetailsProps {
  avatar: Avatar;
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

  const mainColor = getMainColor(props.avatar);

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
            name={props.avatar.name}
            avatarId={props.avatar.id}
            randomize={props.randomize}
          />
          <AvatarImage
            avatar={props.avatar}
            imageOpacity={imageOpacity}
            avatarDetailsHeight={avatarDetailsHeight}
            avatarSpecsHeight={avatarSpecsHeight}
            isLargeDesktop={isLargeDesktop}
          />
          <AvatarSpecs
            types={props.avatar.types}
            height={props.avatar.height}
            weight={props.avatar.weight}
            description={props.avatar.description}
            setAvatarSpecsHeight={setAvatarSpecsHeight}
            isLargeDesktop={isLargeDesktop}
          />
        </div>
      )}
      {props.isSmallDesktop && (
        <AvatarDetailsSmallDesktop
          avatar={props.avatar}
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