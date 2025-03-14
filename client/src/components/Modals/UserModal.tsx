import { useAlert } from "@/hooks/useAlert";
import { useSession } from "@/hooks/useSession";
import { ModalActions } from "@/interfaces/ModalActions";
import { UserModel } from "@/interfaces/User";
import { addUserRequest } from "@/requests/users/add-user";
import { deleteUserByIdRequest } from "@/requests/users/delete-user-by-id";
import { updateUserRequestById } from "@/requests/users/update-user-by-id";
import { ROLES_PT_BR } from "@/utils/constants/role";
import React, { useEffect, useState } from "react";
import { InputWithLabel } from "../Fields/InputWithLabel";
import { Button } from "../Shared/Button";

interface UserModalProps {
  props: ModalActions<UserModel>;
  setProps: React.Dispatch<React.SetStateAction<ModalActions<UserModel>>>;
  callback?: () => Promise<void> | void;
}

export const UserModal = ({ props, setProps, callback }: UserModalProps) => {
  const { user, login } = useSession();
  const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: undefined as string | undefined,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props?.data?.id) {
      setFormData({
        id: props.data.id,
        name: props?.data?.name || "",
        confirmPassword: "",
        email: props?.data?.email || "",
        role: user?.role === "admin" ? props?.data?.role : undefined,
        password: "",
      });
    }
  }, [
    props.data?.email,
    props.data?.id,
    props.data?.name,
    props.data?.role,
    user?.role,
  ]);

  const onReset = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      role: undefined,
      password: "",
      confirmPassword: "",
    });
    setLoading(false);
    setProps({ action: "none", open: false, data: undefined });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    const { confirmPassword, email, name, password } = formData;

    if (password !== confirmPassword) {
      setLoading(false);
      return showAlert("warning", "As senhas não conferem!");
    }

    await addUserRequest({ name, email, password });

    if (callback) await callback();
    else
      await login({
        password,
        email,
      });

    onReset();
  };

  const handleEditUser = async () => {
    const { id, email, name, role } = formData;

    await updateUserRequestById(id, {
      email,
      name,
      role: role as UserModel["role"],
    });

    await callback?.();
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteUserByIdRequest(props.data?.id || "");
      callback?.();
      onReset();
    } catch (error) {
      setLoading(false);

      const serverError = error as {
        statusCode?: number;
        message?: string;
      };

      if (serverError?.statusCode === 403)
        return showAlert("danger", "Você não tem permissão necessária!");
    }
  };

  const handleAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      if (props.action === "add") await handleAddUser();
      if (props.action === "update") await handleEditUser();
      onReset();
    } catch (error) {
      setLoading(false);

      const serverError = error as {
        statusCode?: number;
        message?: string;
      };

      if (serverError?.statusCode === 403)
        return showAlert("danger", "Você não tem permissão necessária!");

      if (serverError?.statusCode === 400)
        return showAlert("danger", "Email já cadastrado!");

      return showAlert(
        "danger",
        `Erro ao ${
          props.action === "add"
            ? "criar"
            : props.action === "update"
            ? "editar"
            : "excluir"
        } usuário!`
      );
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`${
        props.open ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center overflow-y-auto overflow-x-hidden transition-opacity duration-300`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div
          className={`relative bg-white rounded-lg shadow-sm transform transition-transform duration-300 ${
            props.open ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {props.action === "add"
                ? "Criar"
                : props.action === "update"
                ? "Editar"
                : "Excluir"}{" "}
              Usuário
            </h3>
            <div className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 inline-flex justify-center items-center ">
              <Button
                type="link"
                htmlProps={{
                  onClick: onReset,
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </Button>
            </div>
          </div>
          {props?.action === "delete" ? (
            <>
              <div className="p-4 md:p-5">
                <h3 className="text-md  text-gray-900">
                  Tem certeza que deseja excluir o usuário{" "}
                  <b>
                    {props.data?.name} ({props.data?.email})?
                  </b>
                </h3>
              </div>
              <div className="flex flex-row space-x-4 space-y-4">
                <div className="flex flex-col flex-5">
                  <Button
                    htmlProps={{
                      onClick: onReset,
                      disabled: loading,
                    }}
                  >
                    Não
                  </Button>
                </div>
                <div className="flex flex-col flex-4">
                  <Button
                    htmlProps={{
                      onClick: handleDeleteUser,
                    }}
                    type="danger"
                    loading={loading}
                  >
                    Sim
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <form className="p-4 md:p-5" onSubmit={handleAction}>
              <div className="grid gap-4 mb-4 grid-cols-1">
                <InputWithLabel
                  inputProps={{
                    name: "name",
                    id: "name",
                    placeholder: "João da Silva",
                    required: true,
                    value: formData.name,
                    onChange: handleInputChange,
                  }}
                  label={{
                    html: { htmlFor: "name" },
                    children: "Seu nome",
                  }}
                />
                <InputWithLabel
                  inputProps={{
                    type: "email",
                    name: "email",
                    id: "email",
                    placeholder: "name@example.com",
                    required: true,
                    value: formData.email,
                    onChange: handleInputChange,
                  }}
                  label={{
                    html: { htmlFor: "email" },
                    children: "Seu e-mail",
                  }}
                />
                {props?.action === "add" && (
                  <>
                    <InputWithLabel
                      inputProps={{
                        type: "password",
                        name: "password",
                        id: "password",
                        placeholder: "segredo_super_secreto",
                        required: true,
                        value: formData.password,
                        onChange: handleInputChange,
                      }}
                      label={{
                        html: { htmlFor: "password" },
                        children: "Sua senha",
                      }}
                    />
                    <InputWithLabel
                      inputProps={{
                        type: "password",
                        name: "confirm-password",
                        id: "confirm-password",
                        placeholder: "segredo_super_secreto_confirmado",
                        required: true,
                        value: formData.confirmPassword,
                        onChange: handleInputChange,
                      }}
                      label={{
                        html: { htmlFor: "confirm-password" },
                        children: "Confirme sua senha",
                      }}
                    />
                  </>
                )}
                {props?.action === "update" && user?.role === "admin" && (
                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Selecione a função:
                    </label>
                    <select
                      id="role"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                    >
                      <option value="admin">{ROLES_PT_BR["admin"]}</option>
                      <option value="manager">{ROLES_PT_BR["manager"]}</option>
                      <option value="user">{ROLES_PT_BR["user"]}</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <Button
                  htmlProps={{
                    type: "submit",
                  }}
                  loading={loading}
                >
                  {props.action === "add" ? "Criar" : "Editar"} Usuário
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
