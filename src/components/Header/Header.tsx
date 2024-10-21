import { FC, useRef, useState } from "react";
import { MemberMapType, TeamMemberType, TeamType } from "@/types";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";
import Divider from "@/components/common/Divider/Divider";
import UserMenuButton from "@/components/Header/UserMenuButton";
import HeaderTagLine from "@/components/common/HeaderTagLine/HeaderTagLine";
import { useTimer } from "@/hooks/useTimer";
import IconButton from "@/components/common/IconButton/IconButton";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

interface IHeaderProps {
    room: TeamType;
    prompt: string;
    showToast: (message: string, type: ToastNotificationEnum) => void;
    members: Map<string, MemberMapType>;
    timeLeft: number | null;
    selectedMember: TeamMemberType | null;
    isHidePositions: boolean;
    openLearn: () => void;
}

const Header: FC<IHeaderProps> = (props) => {
    const headerRef = useRef<HTMLElement>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNextRoundModalOpen, setIsNextRoundModalOpen] = useState(false);

    const {
        clearTimer,
        timeLeftInternal: timeLeft,
        timerMinutes,
        timerSeconds,
        isActiveTimer,
        setIsSetTimerButtonVisible,
    } = useTimer({
        timeLeft: props.timeLeft,
        showToast: props.showToast,
        roomId: props.room.id,
    });

    const isAdmin = props.selectedMember?.isAdmin;

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.headerContainer}>
                <HeaderTagLine teamName={props.room.name} />
                <div className={styles.timerUserMenuContainer}>
                    {isAdmin && (
                        <IconButton
                            icon={faPlay}
                            onClick={() => setIsNextRoundModalOpen((t) => !t)}
                        />
                    )}
                    <UserMenuButton
                        setIsUserMenuOpen={setIsUserMenuOpen}
                        selectedMember={props.selectedMember}
                    />
                </div>
            </div>

            <Divider />
            <div className={styles.promptAndButtonsContainer}></div>
        </header>
    );
};

export default Header;
