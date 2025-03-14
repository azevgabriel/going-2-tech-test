import { useAlert } from "@/hooks/useAlert";
import { useSession } from "@/hooks/useSession";
import { ModalActions } from "@/interfaces/ModalActions";
import { UserModel } from "@/interfaces/User";
import { loadUsersRequest } from "@/requests/users/load-users";
import { ROLES_PT_BR } from "@/utils/constants/role";
import { useCallback, useEffect, useState } from "react";
import { UserModal } from "../Modals/UserModal";
import { Button } from "../Shared/Button";
import { Spinner } from "../Shared/Spinner";

export const UserTable = () => {
  const { user } = useSession();
  const { showAlert } = useAlert();

  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userModalProps, setUserModelProps] = useState<ModalActions<UserModel>>(
    {
      action: "none",
      open: false,
    }
  );

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await loadUsersRequest();
      setUsers(response);
    } catch (error) {
      const serverError = error as {
        statusCode?: number;
        message?: string;
      };

      if (serverError?.statusCode && serverError?.statusCode > 401)
        return showAlert(
          "danger",
          "Você não tem permissão necessária para acessar essa página."
        );

      return showAlert("danger", "Ops! Aconteceu um problema no servidor.");
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div
      className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg"
      style={{ maxHeight: "calc(100vh - 88px - 16px)" }}
    >
      {loading ? (
        <div className="flex items-center justify-center w-full p-4">
          <Spinner scale={1} />
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Usuário
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Função
              </th>
              <th scope="col" className="px-6 py-3">
                Criado em
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.length === 0 ? (
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                key={`user-table-row-empty`}
              >
                <td className=" p-4">Nenhum usuário encontrado</td>
                <td />
                <td />
                <td />
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Criar
                  </a>
                </td>
              </tr>
            ) : (
              users?.map(({ id, name, email, role, created_at }, index) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  key={`user-table-row-${index}`}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {name}
                  </td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4">{ROLES_PT_BR[role]}</td>
                  <td className="px-6 py-4">
                    {new Date(created_at).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-2">
                    <div className="flex justify-evenly">
                      <Button
                        htmlProps={{
                          onClick: () =>
                            setUserModelProps({
                              action: "update",
                              open: true,
                              data: {
                                id,
                                name,
                                email,
                                role,
                              },
                            }),
                        }}
                      >
                        Editar
                      </Button>
                      {((user?.role === "manager" && role === "user") ||
                        user?.role === "admin") &&
                        user?.id !== id && (
                          <Button
                            type="danger"
                            htmlProps={{
                              onClick: () =>
                                setUserModelProps({
                                  action: "delete",
                                  open: true,
                                  data: {
                                    id,
                                    name,
                                    email,
                                  },
                                }),
                            }}
                          >
                            Deletar
                          </Button>
                        )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      <UserModal
        props={userModalProps}
        setProps={setUserModelProps}
        key="user-modal-table"
        callback={fetchUsers}
      />
    </div>
  );
};
