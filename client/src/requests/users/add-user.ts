import { AddUserModel, UserModel } from "@/interfaces/User";
import { fetchExternalUrl, handleJSONResponse } from "@/services/external-api";

export const addUserRequest = async (
  data: AddUserModel | (AddUserModel & { role: UserModel["role"] })
): Promise<UserModel> => {
  const response = await fetchExternalUrl(
    "/users",
    "POST",
    JSON.stringify(data)
  );
  return await handleJSONResponse(response);
};
