import { BASE_URL } from "./constants";
import { handleJsonResponsePut } from "./utils";

export const putTimer = ({
  roomId,
  timer,
}: {
  roomId: string;
  timer: number;
}) => {
  const endpoint = `${BASE_URL}/rooms/${roomId}/timer`;
  return fetch(endpoint, {
    method: "PUT",
    body: JSON.stringify({ timer }),
    headers: { "Content-Type": "application/json" },
  }).then(handleJsonResponsePut);
};

export const deleteTimer = ({ roomId }: { roomId: string }) => {
  const endpoint = `${BASE_URL}/rooms/${roomId}/timer`;
  return fetch(endpoint, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(handleJsonResponsePut);
};
