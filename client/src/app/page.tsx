"use client";

import { AuthenticateForm } from "@/components/Forms/AuthenticateForm";
import { UserModal } from "@/components/Modals/UserModal";
import { Button } from "@/components/Shared/Button";
import { UserTable } from "@/components/Tables/UserTable";
import { useSession } from "@/hooks/useSession";
import { ModalActions } from "@/interfaces/ModalActions";
import { UserModel } from "@/interfaces/User";
import { ROLES_PT_BR } from "@/utils/constants/role";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function Home() {
  const { user, logout, updateProfile } = useSession();
  const [menu, setMenu] = useState<"profile" | "users">("profile");
  const [userModalProps, setUserModelProps] = useState<ModalActions<UserModel>>(
    {
      action: "none",
      open: false,
    }
  );

  const menuItems = useMemo(() => {
    if (!user) return;

    const { email, name, role, created_at } = user;

    if (menu === "users" && user?.role !== "user") return <UserTable />;
    else
      return (
        <div
          className="flex justify-center items-center"
          style={{ height: "calc(100vh - 88px - 88px - 16px)" }}
        >
          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {email}
            </p>
            <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {ROLES_PT_BR[role]}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Criado em{" "}
              {new Date(created_at).toLocaleDateString("pt-br", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
            <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <div className="flex flex-col space-y-4">
              <Button
                htmlProps={{
                  onClick: () =>
                    setUserModelProps({
                      action: "update",
                      open: true,
                      data: user,
                    }),
                }}
              >
                Editar
              </Button>
            </div>
          </div>
        </div>
      );
  }, [menu, user]);

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
        <main className="max-w p-2">{menuItems}</main>
        <UserModal
          props={userModalProps}
          setProps={setUserModelProps}
          callback={updateProfile}
          key="update-profile"
        />
      </>
    );
  }

  return <AuthenticateForm />;
}
