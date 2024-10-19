import { Dispatch, FC, SetStateAction } from "react";
import pokeball from "@/assets/pokeball.png";
import Avatar from "@/components/common/Avatar/Avatar";
import { TeamMemberType } from "@/types";
import styles from "./UserMenuButton.module.scss";

interface IUserMenuButtonProps {
  setIsUserMenuOpen: Dispatch<SetStateAction<boolean>>;
  selectedMember: TeamMemberType | null;
}

const UserMenuButton: FC<IUserMenuButtonProps> = ({
  setIsUserMenuOpen,
  selectedMember,
}: IUserMenuButtonProps) => {
  const isMemberSelected = selectedMember !== null;

  return (
    <>
      {!isMemberSelected && (
        <button
          className={styles.userMenuOpenButton}
          onClick={() => setIsUserMenuOpen((t) => !t)}
        >
          <img src={pokeball} alt="User menu icon" />
        </button>
      )}
      {isMemberSelected && (
        <button onClick={() => setIsUserMenuOpen((t) => !t)}>
          <Avatar
            src={selectedMember.avatar}
            backgroundColor={selectedMember.color}
          />
        </button>
      )}
    </>
  );
};

export default UserMenuButton;
