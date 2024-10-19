import { FC, useEffect, useRef, useState } from "react";
import { TeamMemberType, TeamType } from "@/types";
import PageHeader from "@/components/common/HeaderTagLine/PageHeader";
import TeamSelection from "@/components/Home/TeamSelection";
import MemberSelection from "@/components/Home/MemberSelection";
import { formatName } from "@/ts/utils";
import { getSelectedMemberFromLocalStorage } from "@/ts/localStorageUtils";
import styles from "./Home.module.scss";

interface IHomeProps {
  rooms: TeamType[];
}

const Home: FC<IHomeProps> = (props) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [width, setWidth] = useState<number | string>("unset");
  const homeRef = useRef<HTMLDivElement>(null);
  const marginLeft = typeof width === "number" ? -width * currentStep : "unset";

  const setSelectedMemberFromLocalStorage = (roomId: string) => {
    if (selectedTeam) {
      const memberId = getSelectedMemberFromLocalStorage(roomId);
      if (memberId) {
        const selected = selectedTeam.members
          .flat()
          .find((member) => member.id === memberId);
        if (selected) {
          setSelectedMember(selected);
        }
      }
    }
  };

  useEffect(() => {
    if (homeRef.current) {
      setWidth(homeRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    setSelectedMemberFromLocalStorage(selectedTeam?.id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam]);

  return (
    <>
      <PageHeader />
      <div className={styles.home} ref={homeRef}>
        <h1>Ready to start a sprint retro ?</h1>
        <div className={styles.stepsContainer}>
          <div
            className={styles.step}
            style={{
              minWidth: width,
              marginLeft: marginLeft,
            }}
          >
            <TeamSelection
              teams={props.rooms}
              onClickTeam={(team: TeamType) => {
                setSelectedTeam(team);
                setCurrentStep(1);
              }}
            />
          </div>

          <div
            className={styles.step}
            style={{ minWidth: `calc(${width} - 20px)` }}
          >
            <MemberSelection
              teamMembers={selectedTeam?.members.flat() ?? []}
              back={() => {
                setSelectedTeam(null);
                setSelectedMember(null);
                setCurrentStep(0);
              }}
              onClickMember={(member: TeamMemberType) =>
                setSelectedMember(member)
              }
              selectedMember={selectedMember}
              roomLink={`/${formatName(selectedTeam?.name ?? "")}`}
              roomId={selectedTeam?.id ?? ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
