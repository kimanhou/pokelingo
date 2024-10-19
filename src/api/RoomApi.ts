import { BASE_URL } from "./constants";
import { handleJsonResponse } from "./utils";

export const getRoom = (roomId: string) => {
  const endpoint = `${BASE_URL}/rooms/${roomId}`;
  // data structure of response:
  //  {
  //    prompt: string,
  //    members: {
  //      id: string,
  //      position: {x: number, y: number},
  //      avatarUrl : string
  //      status : string
  //    }[]
  //  }
  return fetch(endpoint).then(handleJsonResponse);
};
