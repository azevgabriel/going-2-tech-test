import { UserModel } from "@/interfaces/User";
import { fetchExternalUrl, handleJSONResponse } from "@/services/external-api";

export const loadUsersRequest = async (): Promise<UserModel[]> => {
  const response = await fetchExternalUrl("/users", "GET");
  return await handleJSONResponse(response);
};
