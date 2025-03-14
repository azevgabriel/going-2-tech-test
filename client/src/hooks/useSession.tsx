"use client";

import { authenticateUserRequest } from "@/requests/auth/authenticate-user";
import { getUserProfile } from "@/requests/auth/get-profile";
import { LOCAL_STORAGE_KEYS } from "@/utils/constants/local-storage";
import { createContext, ReactNode, useContext, useState } from "react";
import { AuthenticateUserModel } from "../interfaces/Auth";
import { UserModel } from "../interfaces/User";
import { useAlert } from "./useAlert";

interface SessionContextData {
  login: (values: AuthenticateUserModel) => Promise<void>;
  logout: () => void;
  user: UserModel | null;
  updateProfile: () => Promise<void>;
}

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData
);

const SessionProvider = ({ children }: SessionProviderProps) => {
  const { showAlert } = useAlert();

  const [user, setUser] = useState<UserModel | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = window.localStorage.getItem(
        LOCAL_STORAGE_KEYS["USER"]
      );
      if (storedUser) return JSON.parse(storedUser);
    }
    return null;
  });

  const login = async (values: AuthenticateUserModel): Promise<void> => {
    if (typeof window === "undefined") return;

    try {
      const authResponse = await authenticateUserRequest(values);
      const { user, token } = authResponse;

      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS["USER"],
        JSON.stringify(user)
      );
      window.localStorage.setItem(LOCAL_STORAGE_KEYS["TOKEN"], token);
      setUser(user);
    } catch (error) {
      const serverError = error as {
        statusCode?: number;
        message?: string;
      };

      if (serverError?.statusCode && serverError?.statusCode > 400)
        return showAlert("danger", "E-mail ou senha incorretos!");

      return showAlert("warning", "Ops! Não foi possivel realizar o Login...");
    }
  };

  const updateProfile = async () => {
    try {
      const profile = await getUserProfile();
      window.localStorage.setItem(
        LOCAL_STORAGE_KEYS["USER"],
        JSON.stringify(profile)
      );
      setUser(profile);
    } catch {
      return showAlert(
        "danger",
        "Ops! Não foi possivel realizar esse operação."
      );
    }
  };

  const logout = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem(LOCAL_STORAGE_KEYS["USER"]);
    localStorage.removeItem(LOCAL_STORAGE_KEYS["TOKEN"]);
    setUser(null);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

function useSession(): SessionContextData {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSession must be used within an SessionProvider");
  return context;
}

export { SessionProvider, useSession };
