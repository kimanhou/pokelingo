import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button/Button";
import { TeamMemberType } from "@/types";
import { setSelectedMemberInLocalStorage } from "@/ts/localStorageUtils";
import styles from "./MemberSelection.module.scss";

interface IMemberSelectionProps {
    teamMembers: TeamMemberType[];
    back: () => void;
    onClickMember: (member: TeamMemberType) => void;
    selectedMember: TeamMemberType | null;
    roomLink: string;
    roomId: string;
}

const MemberSelection: FC<IMemberSelectionProps> = ({
    teamMembers,
    back,
    onClickMember,
    selectedMember,
    roomLink,
    roomId,
}: IMemberSelectionProps) => {
    const next = () => {
        if (selectedMember === null) return;

        setSelectedMemberInLocalStorage({ member: selectedMember, roomId });
    };

    return (
        <>
            <h2>Choose your character</h2>
            <div className={styles.memberSelectionContainer}></div>
            <div className={styles.buttonsContainer}>
                <Button onClick={back} text="Back" />
                {selectedMember !== null && (
                    <Link to={roomLink}>
                        <Button onClick={next} text="Next" secondary />
                    </Link>
                )}
            </div>
        </>
    );
};

export default MemberSelection;
