import {
  AuthenticateUserModel,
  AuthenticateUserResponse,
} from "@/interfaces/Auth";
import { fetchExternalUrl, handleJSONResponse } from "@/services/external-api";

export const authenticateUserRequest = async (
  data: AuthenticateUserModel
): Promise<AuthenticateUserResponse> => {
  const response = await fetchExternalUrl(
    "/auth",
    "POST",
    JSON.stringify(data)
  );
  return await handleJSONResponse(response);
};
