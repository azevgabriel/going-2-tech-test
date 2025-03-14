import { UserModel } from "@/interfaces/User";
import { fetchExternalUrl, handleJSONResponse } from "@/services/external-api";

export const getUserProfile = async (): Promise<UserModel> => {
  const response = await fetchExternalUrl("/auth", "GET");
  return await handleJSONResponse(response);
};
