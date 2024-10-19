import { TeamMemberType } from "@/types";

const LOCAL_STORAGE_APP_NAME = "pokelingo";

const getMemberKeyWithRoomId = (roomId: string) => {
    return `${LOCAL_STORAGE_APP_NAME}.${roomId}.member`;
};

const getMemberKey = () => {
    return `${LOCAL_STORAGE_APP_NAME}.member`;
};

export const setSelectedMemberInLocalStorage = ({
    member,
    roomId,
}: {
    member: TeamMemberType;
    roomId: string;
}) => {
    localStorage.setItem(getMemberKeyWithRoomId(roomId), member.id);
};

export const getSelectedMemberFromLocalStorage = (roomId: string) => {
    return localStorage.getItem(getMemberKeyWithRoomId(roomId));
};

export const getMemberIdFromLocalStorage = () => {
    return localStorage.getItem(getMemberKey());
};

export const clearLocalStorage = () => {
    localStorage.clear();
};
