import { BASE_URL } from "./constants";
import { handleJsonResponsePut } from "./utils";

export const putHidePositions = ({
  roomId,
  hidePositions,
}: {
  roomId: string;
  hidePositions: boolean;
}) => {
  const endpoint = `${BASE_URL}/rooms/${roomId}/hide-positions`;
  return fetch(endpoint, {
    method: "PUT",
    body: JSON.stringify({ hidePositions }),
    headers: { "Content-Type": "application/json" },
  }).then(handleJsonResponsePut);
};
