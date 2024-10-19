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

interface IEditAvatarProps {
    closeEditAvatar: () => void;
    roomId: string;
    memberId: string;
    showToast: (message: string, type: ToastNotificationEnum) => void;
    members: TeamMemberType[];
    selectedAvatarImageUrl?: string;
}

const EditAvatar: FC<IEditAvatarProps> = (props) => {
    const isSmallDesktop = useIsSmallDesktop();
    const isMobile = useIsMobile();

    const [displayedSelectedAvatar, setDisplayedSelectedAvatar] =
        useState<Avatar>(
            AVATARS.find(
                (t) => t.imageUrl === props.selectedAvatarImageUrl
            ) || {
                id: 0,
                imageUrl: "",
                name: "",
                types: [],
            }
        );
    const [search, setSearch] = useState("");
    const [displayedOptions, setDisplayedOptions] = useState<Avatar[]>(AVATARS);

    const hasSelectedNewAvatar =
        props.selectedAvatarImageUrl !== displayedSelectedAvatar.imageUrl;

    const mainColor = getMainColor(displayedSelectedAvatar);

    const unavailableAvatarsImageUrl = props.members
        .filter(
            (member) =>
                member.avatar && member.avatar !== props.selectedAvatarImageUrl
        )
        .map((t) => t.avatar)
        .filter((u) => u !== undefined) as string[];
    const availableAvatars = AVATARS.filter(
        (avatar) => !unavailableAvatarsImageUrl.includes(avatar.imageUrl)
    );

    const onSave = async () => {
        try {
            await putAvatarUrl({
                roomId: props.roomId,
                memberId: props.memberId,
                avatarUrl: displayedSelectedAvatar.imageUrl,
            });
            props.closeEditAvatar();
        } catch (error: unknown) {
            handleError({
                error,
                showErrorToast: (message: string) =>
                    props.showToast(message, ToastNotificationEnum.FAILURE),
                defaultErrorMessage:
                    "An error occurred while updating the avatar",
            });
        }
    };

    const randomize = () => {
        const randomIndex = Math.floor(Math.random() * availableAvatars.length);
        setDisplayedSelectedAvatar(availableAvatars[randomIndex]);
        scrollTo({ elementId: `avatar-${randomIndex + 1}` });
    };

    useEffect(() => {
        setDisplayedOptions(
            AVATARS.filter(
                (avatar) =>
                    avatar.id === parseInt(search) ||
                    avatar.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);

    return (
        <div className={styles.editAvatar}>
            <button
                onClick={props.closeEditAvatar}
                className={styles.closeButton}
            >
                <CloseIcon color="var(--fg)" />
            </button>
            <div className={styles.contentContainer}>
                <AvatarDetails
                    avatar={displayedSelectedAvatar}
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
                        displayedOptions={displayedOptions}
                        displayedSelectedAvatar={displayedSelectedAvatar}
                        setDisplayedSelectedAvatar={setDisplayedSelectedAvatar}
                        unavailableAvatarsImageUrl={unavailableAvatarsImageUrl}
                        isSmallDesktop={isSmallDesktop}
                    />
                    <div className={styles.buttonsContainer}>
                        <Button onClick={props.closeEditAvatar} text="Back" />
                        {hasSelectedNewAvatar && (
                            <Button onClick={onSave} text="Save" secondary />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAvatar;
