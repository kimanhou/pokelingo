import { Coordinates } from "@/types";
import { BASE_URL } from "./constants";
import { handleJsonResponsePut } from "./utils";

export const putPosition = ({
  roomId,
  memberId,
  coordinates,
}: {
  roomId: string;
  memberId: string;
  coordinates: Coordinates;
}) => {
  const endpoint = `${BASE_URL}/rooms/${roomId}/members/${memberId}/position`;
  return fetch(endpoint, {
    method: "PUT",
    body: JSON.stringify({ x: coordinates.x, y: coordinates.y }),
    headers: { "Content-Type": "application/json" },
  }).then(handleJsonResponsePut);
};

export const putAvatarUrl = ({
  roomId,
  memberId,
  avatarUrl,
}: {
  roomId: string;
  memberId: string;
  avatarUrl: string;
}) => {
  const endpoint = `${BASE_URL}/rooms/${roomId}/members/${memberId}/avatar`;
  return fetch(endpoint, {
    method: "PUT",
    body: JSON.stringify({ avatarUrl }),
    headers: { "Content-Type": "application/json" },
  }).then(handleJsonResponsePut);
};
