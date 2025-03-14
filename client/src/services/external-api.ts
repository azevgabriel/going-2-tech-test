import { LOCAL_STORAGE_KEYS } from "@/utils/constants/local-storage";

const useLocalhost = true;

export const baseUrlSelect = () => {
  switch (window.location.hostname) {
    case "[FRONTEND_DEPLOYED_URL]":
      return "[API_DEPLOYED_URL]";
    default:
      if (useLocalhost) return "http://localhost:8080";
      return "[API_DEPLOYED_URL]";
  }
};

export const fetchExternalUrl = async (
  path: string,
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
  body?: BodyInit
) => {
  let autorization = "";
  const token = window?.localStorage.getItem(LOCAL_STORAGE_KEYS["TOKEN"]);
  if (token) autorization = `Bearer ${token}`;

  const url = baseUrlSelect() + path;
  return fetch(url, {
    method: method,
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: autorization,
    },
  });
};

export const handleJSONResponse = async (res: Response) => {
  const body = await res.json();

  if (!res.ok)
    throw {
      statusCode: res.status,
      message: body.message || "Erro desconhecido",
    };

  return body;
};
