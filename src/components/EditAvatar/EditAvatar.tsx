import { FC, useEffect, useState } from "react";
import CloseIcon from "@/components/common/Icons/CloseIcon";
import AvatarOptions from "@/components/EditAvatar/Options/AvatarOptions";
import Button from "@/components/common/Button/Button";
import AvatarDetails from "@/components/EditAvatar/Details/AvatarDetails";
import Search from "@/components/EditAvatar/Search/Search";
import { putAvatarUrl } from "@/api/MembersApi";
import { handleError } from "@/api/utils";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";
import { AVATARS } from "@/data/avatars";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { Avatar, TeamMemberType } from "@/types";
import { useIsMobile, useIsSmallDesktop } from "@/hooks/useIsMobile";
import { getMainColor, scrollTo } from "@/ts/utils";
import styles from "./EditAvatar.module.scss";
import Creature from "@/data/creature";

interface IEditAvatarProps {
    creatures : Creature[]
}

const EditAvatar: FC<IEditAvatarProps> = (props) => {
    const isSmallDesktop = useIsSmallDesktop();
    const isMobile = useIsMobile();

    const [displayedSelectedAvatar, setDisplayedSelectedAvatar] =
        useState<Creature>(Creature.getDefaultValue());
    const [search, setSearch] = useState("");

    const mainColor = getMainColor(displayedSelectedAvatar);

    const randomize = () => {
        // const randomIndex = Math.floor(Math.random() * AVATARS.length);
        // setDisplayedSelectedAvatar(AVATARS[randomIndex]);
        // scrollTo({ elementId: `avatar-${randomIndex + 1}` });
    };

    useEffect(() => {
        randomize();
    }, [search]);

    return (
        <div className={styles.editAvatar}>
            <AvatarDetails
                creature={displayedSelectedAvatar}
                randomize={randomize}
                isSmallDesktop={isSmallDesktop}
                isMobile={isMobile}
                search={search}
                setSearch={setSearch}
            />
            <div className={styles.right}>
                {!isSmallDesktop && (
                    <div className={styles.randomizeSearchButtonsContainer}>
                        <Button
                            onClick={randomize}
                            text="Randomize"
                            icon={faShuffle}
                            backgroundColor={mainColor}
                        />
                        <Search
                            search={search}
                            setSearch={setSearch}
                            mainColor={mainColor}
                        />
                    </div>
                )}
                <AvatarOptions
                    displayedOptions={props.creatures}
                    displayedSelectedAvatar={displayedSelectedAvatar}
                    setDisplayedSelectedAvatar={setDisplayedSelectedAvatar}
                    unavailableAvatarsImageUrl={[]}
                    isSmallDesktop={isSmallDesktop}
                />
            </div>
        </div>
    );
};

export default EditAvatar;
