import { BASE_URL } from "./constants";
import { handleJsonResponsePut } from "./utils";

export const putPrompt = ({
  roomId,
  prompt,
}: {
  roomId: string;
  prompt: string;
}) => {
  const endpoint = `${BASE_URL}/rooms/${roomId}/prompt`;
  return fetch(endpoint, {
    method: "PUT",
    body: JSON.stringify({ prompt }),
    headers: { "Content-Type": "application/json" },
  }).then(handleJsonResponsePut);
};
