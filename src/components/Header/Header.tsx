import { FC, useRef, useState } from "react";
import { MemberMapType, TeamMemberType, TeamType } from "@/types";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";
import Prompt from "@/components/Prompt/Prompt";
import Divider from "@/components/common/Divider/Divider";
import UserMenu from "@/components/UserMenu/UserMenu";
import UserMenuButton from "@/components/Header/UserMenuButton";
import Timer from "@/components/Timer/Timer";
import HeaderTagLine from "@/components/common/HeaderTagLine/HeaderTagLine";
import SetNextRoundModal from "@/components/SetNextRoundModal/SetNextRoundModal";
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
  openEditAvatar: () => void;
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
          <Timer
            timeLeft={timeLeft}
            setIsSetTimerButtonVisible={setIsSetTimerButtonVisible}
            clearTimer={clearTimer}
            minutes={timerMinutes}
            seconds={timerSeconds}
            isAdmin={isAdmin ?? false}
          />
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
      <div className={styles.promptAndButtonsContainer}>
        <Prompt
          roomId={props.room.id}
          prompt={props.prompt}
          showToast={props.showToast}
        />
      </div>
      <UserMenu
        isOpen={isUserMenuOpen}
        setIsOpen={setIsUserMenuOpen}
        roomId={props.room.id}
        members={props.members}
        showToast={props.showToast}
        isActiveTimer={isActiveTimer}
        clearTimer={clearTimer}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds}
        selectedMember={props.selectedMember}
        isHidePositions={props.isHidePositions}
        openEditAvatar={props.openEditAvatar}
      />
      <SetNextRoundModal
        setIsOpen={setIsNextRoundModalOpen}
        isOpen={isNextRoundModalOpen}
        roomId={props.room.id}
        showToast={props.showToast}
        members={props.members}
        currentHidePositions={props.isHidePositions}
      />
    </header>
  );
};

export default Header;
