import { LoginStatus } from "@/ts/enums";

export type RoomType = {
  id: string;
  name: string;
  positions: Position[];
};

export type MemberMapType = {
  position: Coordinates;
  status: LoginStatus;
  avatarUrl: string;
  activeTimeout: ReturnType<typeof setTimeout>[];
};

export type MemberFromBackEndType = MemberMapType & {
  id: string;
};

export type TeamMemberType = {
  id: string;
  color: string;
  name: string;
  avatar?: string;
  isAdmin?: boolean;
  colorDark?: string;
};

export type TeamType = {
  id: string;
  name: string;
  members: TeamMemberType[][];
  logoSrc: string;
  color?: string;
};

export type Coordinates = {
  x: number | null;
  y: number | null;
};

export type Position = {
  id: string;
  position: Coordinates;
};

export type PositionFromBackend = {
  id: string;
  position: Coordinates;
};

export type Avatar = {
  id: number;
  name: string;
  types: string[];
  height?: number; // in decimeters
  weight?: number; // in hectograms
  description?: string;
};

export type CreateOrJoinRoomIllustration = {
  url: string;
  color: string;
  lightColor: string;
};
