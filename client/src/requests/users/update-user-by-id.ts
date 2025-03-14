import { AddUserModel, UserModel } from "@/interfaces/User";
import { fetchExternalUrl, handleJSONResponse } from "@/services/external-api";

export const updateUserRequestById = async (
  id: string,
  data: AddUserModel
): Promise<UserModel> => {
  const response = await fetchExternalUrl(
    `/users/${id}`,
    "PUT",
    JSON.stringify(data)
  );
  return await handleJSONResponse(response);
};
