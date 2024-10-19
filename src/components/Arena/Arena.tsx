import { FC, DragEvent, useRef, Dispatch, SetStateAction } from "react";
import GamePiece from "@/components/GamePiece/GamePiece";
import IconWithTooltip from "@/components/common/IconWithTooltip/IconWithTooltip";
import { putPosition } from "@/api/MembersApi";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import pokeball from "@/assets/pokeball.png";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";
import { handleError } from "@/api/utils";
import { TeamType, MemberMapType } from "@/types";
import {
  calculatePositionInTopLeft,
  calculatePositionInTrigonometry,
  findTeamMember,
} from "@/ts/positionUtils";
import { updateMembersMapPosition } from "@/ts/membersMapUtils";
import { isIterable } from "@/ts/utils";
import styles from "./Arena.module.scss";

interface ArenaProps {
  room: TeamType;
  showToast: (message: string, type: ToastNotificationEnum) => void;
  members: Map<string, MemberMapType>;
  setMembers: Dispatch<SetStateAction<Map<string, MemberMapType>>>;
  selectedMemberId?: string;
  isHidePositions: boolean;
}

const Arena: FC<ArenaProps> = (props) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const ORBIT_COLORS = {
    STRONGLY_DISAGREE: "#ffba08",
    DISAGREE: "#faa307",
    NOT_SURE: "#e85d04",
    AGREE: "#e85d04",
  };

  const drop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const [memberId, offsetX, offsetY] = e.dataTransfer
      .getData("text/plain")
      .split(",");

    const dropZoneRefTop =
      dropZoneRef.current?.getBoundingClientRect()?.top ?? 0;
    const dropZoneRefLeft =
      dropZoneRef.current?.getBoundingClientRect()?.left ?? 0;
    const { x, y } = calculatePositionInTrigonometry({
      left: e.clientX - dropZoneRefLeft - parseInt(offsetX),
      top: e.clientY - dropZoneRefTop - parseInt(offsetY),
    });

    props.setMembers(
      updateMembersMapPosition({ id: memberId, position: { x, y } })
    );

    try {
      await putPosition({
        roomId: props.room.id,
        memberId,
        coordinates: { x, y },
      });
    } catch (error: unknown) {
      handleError({
        error,
        showErrorToast: (message: string) =>
          props.showToast(message, ToastNotificationEnum.FAILURE),
        defaultErrorMessage: "An error occurred while updating the position",
      });
    }
  };

  return (
    <div className={styles.arena}>
      {props.isHidePositions && (
        <IconWithTooltip
          icon={faEyeSlash}
          tooltipText="All positions, except yours, are hidden."
          color="#676767" // --color-grey
        />
      )}
      <div
        className={styles.dropZone}
        onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
        onDrop={drop}
        ref={dropZoneRef}
      >
        {Array.from(props.members).map((t) => {
          if (!isIterable(t)) return null;
          const [id, memberMapValue] = t;
          const { top, left } = calculatePositionInTopLeft(
            memberMapValue.position
          );
          if (!top || !left) return null;

          try {
            const member = findTeamMember({
              teamMemberId: id,
              teamMembers: props.room.members.flat(),
            });
            return (
              <GamePiece
                key={id}
                teamMember={member}
                absolute={true}
                top={`${top}px`}
                left={`${left}px`}
                isSelected={
                  props.selectedMemberId !== null &&
                  props.selectedMemberId === id
                }
                isHidden={props.isHidePositions}
                isArena={true}
              />
            );
          } catch (error: unknown) {
            console.log(`Member ${id} not found in team.`);
            return null;
          }
        })}
        <svg
          viewBox="0 0 540 540"
          className={styles.arenaSvg}
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="pokeball"
              x="220"
              y="220"
              patternUnits="userSpaceOnUse"
              width="200"
              height="200"
            >
              <image
                x="0"
                y="0"
                width="100"
                height="100"
                href={pokeball}
              ></image>
            </pattern>
          </defs>
          <path
            id="orbit-strongly-disagree"
            d="M20,270a250,250 0 1,0 500,0a250,250 0 1,0 -500,0"
            stroke={ORBIT_COLORS.STRONGLY_DISAGREE}
            fill="none"
          />
          <text
            width="500"
            className={`${styles.orbitText} ${styles.orbitTextStronglyDisagree}`}
          >
            <textPath
              xlinkHref="#orbit-strongly-disagree"
              fill={ORBIT_COLORS.STRONGLY_DISAGREE}
            >
              Strongly disagree
            </textPath>
          </text>
          <path
            id="orbit-disagree"
            d="M70,270a200,200 0 1,0 400,0a200,200 0 1,0 -400,0"
            stroke={ORBIT_COLORS.DISAGREE}
            fill="none"
          />
          <text
            width="500"
            className={`${styles.orbitText} ${styles.orbitTextDisagree}`}
          >
            <textPath xlinkHref="#orbit-disagree" fill={ORBIT_COLORS.DISAGREE}>
              Disagree
            </textPath>
          </text>
          <path
            id="orbit-not-sure"
            d="M120,270a150,150 0 1,0 300,0a150,150 0 1,0 -300,0"
            stroke={ORBIT_COLORS.NOT_SURE}
            fill="none"
          />
          <text
            width="500"
            className={`${styles.orbitText} ${styles.orbitTextNotSure}`}
          >
            <textPath xlinkHref="#orbit-not-sure" fill={ORBIT_COLORS.NOT_SURE}>
              Not sure
            </textPath>
          </text>
          <path
            id="orbit-agree"
            d="M170,270a100,100 0 1,0 200,0a100,100 0 1,0 -200,0"
            stroke={ORBIT_COLORS.AGREE}
            fill="none"
          />
          <text
            width="500"
            className={`${styles.orbitText} ${styles.orbitTextAgree}`}
          >
            <textPath xlinkHref="#orbit-agree" fill={ORBIT_COLORS.AGREE}>
              Agree
            </textPath>
          </text>
          <circle
            cx="270"
            cy="270"
            r="50"
            strokeWidth="1px"
            stroke="#333333"
            fill="url(#pokeball)"
            className={styles.center}
          />
        </svg>
      </div>
    </div>
  );
};

export default Arena;
