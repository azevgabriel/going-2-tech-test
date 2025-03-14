import { fetchExternalUrl } from "@/services/external-api";

export const deleteUserByIdRequest = async (id: string): Promise<void> => {
  const response = await fetchExternalUrl(`/users/${id}`, "DELETE");

  if (!response.ok) {
    const body = await response.json();

    throw {
      statusCode: response.status,
      message: body.message || "Erro desconhecido",
    };
  }
};
