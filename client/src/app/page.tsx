"use client";

import { AuthenticateForm } from "@/components/Forms/AuthenticateForm";
import { Button } from "@/components/Shared/Button";
import { UserTable } from "@/components/Tables/UserTable";
import { useSession } from "@/hooks/useSession";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { user, logout } = useSession();
  const [menu, setMenu] = useState<"profile" | "users">("profile");

  if (user) {
    return (
      <>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Image
              className="h-14 w-50"
              src="/logo.webp"
              alt="logo"
              width={384}
              height={108}
            />
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                {user?.role !== "user" && (
                  <li>
                    <Button
                      key="nav-users"
                      type="link"
                      htmlProps={{
                        onClick: () => setMenu("users"),
                      }}
                    >
                      Usuários
                    </Button>
                  </li>
                )}
                <li>
                  <Button
                    key="nav-profile"
                    type="link"
                    htmlProps={{
                      onClick: () => setMenu("profile"),
                    }}
                  >
                    Meu Perfil
                  </Button>
                </li>
                <li>
                  <Button
                    key="nav-profile"
                    type="link"
                    htmlProps={{
                      onClick: logout,
                    }}
                  >
                    Sair
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="max-w p-2">
          {menu === "profile" && <></>}
          {menu === "users" && <UserTable />}
        </main>
      </>
    );
  }

  return <AuthenticateForm />;
}
