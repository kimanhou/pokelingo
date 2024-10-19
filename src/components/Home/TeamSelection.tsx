import { FC } from "react";
import { TeamType } from "@/types";
import styles from "./TeamSelection.module.scss";

interface ITeamSelectionProps {
  teams: TeamType[];
  onClickTeam: (team: TeamType) => void;
}

const TeamSelection: FC<ITeamSelectionProps> = (props) => {
  return (
    <>
      <h2>Choose your team</h2>
      <div className={styles.teamSelectionContainer}>
        {props.teams.map((team) => (
          <div
            className={styles.teamSelection}
            onClick={() => props.onClickTeam(team)}
            key={team.name}
            style={{
              outlineColor: team.color,
            }}
          >
            <div
              className={styles.teamLogo}
              style={{ backgroundImage: `url(${team.logoSrc})` }}
            />
            <h3>{team.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamSelection;
