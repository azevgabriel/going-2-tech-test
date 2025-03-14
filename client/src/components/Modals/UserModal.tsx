import { useAlert } from "@/hooks/useAlert";
import { useSession } from "@/hooks/useSession";
import { ModalActions } from "@/interfaces/ModalActions";
import { UserModel } from "@/interfaces/User";
import { addUserRequest } from "@/requests/users/add-user";
import { getValuesOnFormSubmit } from "@/utils/html-form";
import React from "react";
import { InputWithLabel } from "../Fields/InputWithLabel";
import { Button } from "../Shared/Button";

interface UserModalProps {
  props: ModalActions<UserModel>;
  setProps: React.Dispatch<React.SetStateAction<ModalActions<UserModel>>>;
}

export const UserModal = ({ props, setProps }: UserModalProps) => {
  const { login } = useSession();
  const { showAlert } = useAlert();

  const [loading, setLoading] = React.useState(false);

  const onReset = () => {
    setLoading(false);
    setProps({ action: "none", open: false, data: undefined });
  };

  const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    const formValues = getValuesOnFormSubmit(event);

    const name = formValues.get("name") as string;
    const email = formValues.get("email") as string;
    const password = formValues.get("password") as string;
    const confirmPassword = formValues.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setLoading(false);
      return showAlert("warning", "As senhas não conferem!");
    }

    await addUserRequest({ name, email, password });
    await login({ email, password });
    onReset();
  };

  const handleAction = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    try {
      if (props.action === "add") await handleAddUser(event);
    } catch (error) {
      setLoading(false);

      const serverError = error as {
        statusCode?: number;
        message?: string;
      };

      if (serverError?.statusCode === 400)
        return showAlert("danger", "Email já cadastrado!");

      return showAlert(
        "danger",
        `Erro ao ${props.action === "add" ? "criar" : "editar"} usuário!`
      );
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`${
        !props.open && "hidden"
      } flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {props.action === "add" ? "Criar" : "Editar"} Usuário
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
          <form className="p-4 md:p-5" onSubmit={handleAction}>
            <div className="grid gap-4 mb-4 grid-cols-1">
              <InputWithLabel
                inputProps={{
                  name: "name",
                  id: "name",
                  placeholder: "João da Silva",
                  required: true,
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
                }}
                label={{
                  html: { htmlFor: "email" },
                  children: "Seu e-mail",
                }}
              />
              <InputWithLabel
                inputProps={{
                  type: "password",
                  name: "password",
                  id: "password",
                  placeholder: "segredo_super_secreto",
                  required: true,
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
                }}
                label={{
                  html: { htmlFor: "confirm-password" },
                  children: "Confirme sua senha",
                }}
              />
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
        </div>
      </div>
    </div>
  );
};
