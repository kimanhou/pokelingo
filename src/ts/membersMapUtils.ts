import { Dispatch, SetStateAction } from "react";
import { Coordinates, MemberFromBackEndType, MemberMapType } from "@/types";
import { LoginStatus } from "@/ts/enums";
import { MOTION_DETECTION_DELAY } from "@/api/constants";

export const updateMembersMap =
  (setMembers: Dispatch<SetStateAction<Map<string, MemberMapType>>>) =>
  (member: MemberFromBackEndType) => {
    setMembers((prev) => {
      const clone = new Map(prev);
      clone.set(member.id, {
        position: member.position,
        status: member.status,
        avatarUrl: member.avatarUrl,
        activeTimeout: [],
      });
      return clone;
    });
  };

export const updateMembersPositionsAndActiveTimeout =
  (setMembers: Dispatch<SetStateAction<Map<string, MemberMapType>>>) =>
  ({ id, position }: { id: string; position: Coordinates }) => {
    setMembers((prev) => {
      const clone = new Map(prev);
      if (!clone.has(id)) {
        clone.set(id, {
          position: { x: null, y: null },
          status: LoginStatus.LOGGED_IN,
          avatarUrl: "",
          activeTimeout: [],
        });
      }

      if (clone.has(id) && (clone.get(id)?.activeTimeout?.length || 0) > 0) {
        clone
          .get(id)
          ?.activeTimeout.forEach(
            (timeout) => timeout && clearTimeout(timeout)
          );
      }

      if (position && position.x !== null && position.y !== null) {
        const removeFromActiveMembers = () => {
          updateMembersClearTimeout(setMembers)({ id });
        };

        const timeout = setTimeout(
          removeFromActiveMembers,
          MOTION_DETECTION_DELAY
        );
        const updatedTimeout = clone.get(id)?.activeTimeout || [];
        updatedTimeout?.push(timeout);
        clone.set(id, {
          ...clone.get(id)!,
          position,
          activeTimeout: updatedTimeout,
        });
      } else {
        clone.set(id, {
          ...clone.get(id)!,
          position,
          activeTimeout: [],
        });
      }

      return clone;
    });
  };

export const updateMembersClearTimeout =
  (setMembers: Dispatch<SetStateAction<Map<string, MemberMapType>>>) =>
  ({ id }: { id: string }) => {
    setMembers((prev: Map<string, MemberMapType>) => {
      const clone = new Map(prev);
      if (!clone.has(id)) {
        clone.set(id, {
          position: { x: null, y: null },
          status: LoginStatus.LOGGED_IN,
          avatarUrl: "",
          activeTimeout: [],
        });
      }

      clone.set(id, {
        ...clone.get(id)!,
        activeTimeout: [],
      });

      return clone;
    });
  };

export const updateMembersMapPosition = ({
  id,
  position,
}: {
  id: string;
  position: Coordinates | null;
}) => {
  return (prev: Map<string, MemberMapType>) => {
    const clone = new Map(prev);
    if (!clone.has(id)) {
      clone.set(id, {
        position: { x: null, y: null },
        status: LoginStatus.LOGGED_IN,
        avatarUrl: "",
        activeTimeout: [],
      });
    }

    clone.set(id, {
      ...clone.get(id)!,
      position: position ?? { x: null, y: null },
    });
    return clone;
  };
};

export const updateMembersStatus =
  (setMembers: Dispatch<SetStateAction<Map<string, MemberMapType>>>) =>
  ({ id, status }: { id: string; status: LoginStatus }) => {
    setMembers((prev: Map<string, MemberMapType>) => {
      const clone = new Map(prev);
      if (!clone.has(id)) {
        clone.set(id, {
          position: { x: null, y: null },
          status: LoginStatus.LOGGED_IN,
          avatarUrl: "",
          activeTimeout: [],
        });
      }

      clone.set(id, {
        ...clone.get(id)!,
        status,
      });
      return clone;
    });
  };

export const updateMembersAvatarUrl =
  (setMembers: Dispatch<SetStateAction<Map<string, MemberMapType>>>) =>
  ({ id, avatarUrl }: { id: string; avatarUrl: string }) => {
    setMembers((prev: Map<string, MemberMapType>) => {
      const clone = new Map(prev);
      if (!clone.has(id)) {
        clone.set(id, {
          position: { x: null, y: null },
          status: LoginStatus.LOGGED_IN,
          avatarUrl: "",
          activeTimeout: [],
        });
      }

      clone.set(id, {
        ...clone.get(id)!,
        avatarUrl,
      });
      return clone;
    });
  };
