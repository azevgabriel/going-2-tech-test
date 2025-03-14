import { UpdateUserModel, UserModel } from "@/interfaces/User";
import { fetchExternalUrl, handleJSONResponse } from "@/services/external-api";

export const updateUserRequestById = async (
  id: string,
  data: UpdateUserModel
): Promise<UserModel> => {
  const response = await fetchExternalUrl(
    `/users/${id}`,
    "PUT",
    JSON.stringify(data)
  );
  return await handleJSONResponse(response);
};
