import { Coordinates, MemberMapType, TeamMemberType } from "@/types";
import { isIterable } from "@/ts/utils";
import { putPosition } from "@/api/MembersApi";
import { ToastNotificationEnum } from "@/components/ToastNotification/enum";
import { handleError } from "@/api/utils";
import { putHidePositions } from "@/api/HidePositionsApi";

export const findTeamMember = ({
  teamMembers,
  teamMemberId,
}: {
  teamMembers: TeamMemberType[];
  teamMemberId: string;
}) => {
  const teamMember = teamMembers.find((t) => t.id === teamMemberId);

  if (!teamMember)
    throw new Error("Cannot find team member with id " + teamMemberId);

  return teamMember;
};

export const calculatePositionInTopLeft = (position: Coordinates) => {
  const { x, y } = position || {};
  if (!x || !y) return { top: null, left: null };
  const left = 300 + x * 300;
  const top = 300 + y * 300;
  return { top, left };
};

export const calculatePositionInTrigonometry = ({
  top,
  left,
}: {
  top: number;
  left: number;
}) => {
  const x = left / 300 - 1;
  const y = top / 300 - 1;
  return { x, y };
};

export const resetPositions = ({
  members,
  roomId,
  onResetPositionsEnd,
  showToast,
}: {
  members: Map<string, MemberMapType>;
  roomId: string;
  showToast: (message: string, type: ToastNotificationEnum) => void;
  onResetPositionsEnd?: () => void;
}) => {
  try {
    Array.from(members).forEach((member, index) => {
      if (!isIterable(member)) return null;
      const [memberId] = member;
      setTimeout(async () => {
        await putPosition({
          roomId,
          memberId,
          coordinates: { x: null, y: null },
        });
      }, index * 50);
    });
    onResetPositionsEnd && onResetPositionsEnd();
  } catch (error: unknown) {
    handleError({
      error,
      showErrorToast: (message: string) =>
        showToast(message, ToastNotificationEnum.FAILURE),
      defaultErrorMessage: "An error occurred while resetting all positions.",
    });
    onResetPositionsEnd && onResetPositionsEnd();
  }
};

export const updateHidePositions = async ({
  roomId,
  isHidePositions,
  showToast,
  onSuccess,
}: {
  roomId: string;
  isHidePositions: boolean;
  showToast: (message: string, type: ToastNotificationEnum) => void;
  onSuccess?: () => void;
}) => {
  try {
    await putHidePositions({
      roomId,
      hidePositions: isHidePositions,
    });
    onSuccess && onSuccess();
  } catch (error: unknown) {
    handleError({
      error,
      showErrorToast: (message: string) =>
        showToast(message, ToastNotificationEnum.FAILURE),
      defaultErrorMessage: "An error occurred while updating hide positions",
    });
  }
};
