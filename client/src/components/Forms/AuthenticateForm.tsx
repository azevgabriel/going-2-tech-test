import { useSession } from "@/hooks/useSession";
import { ModalActions } from "@/interfaces/ModalActions";
import { UserModel } from "@/interfaces/User";
import { getValuesOnFormSubmit } from "@/utils/html-form";
import Image from "next/image";
import { useState } from "react";
import { InputWithLabel } from "../Fields/InputWithLabel";
import { UserModal } from "../Modals/UserModal";
import { Button } from "../Shared/Button";

export const AuthenticateForm = () => {
  const { login } = useSession();
  const [loading, setLoading] = useState(false);
  const [userModalProps, setUserModelProps] = useState<ModalActions<UserModel>>(
    {
      action: "none",
      open: false,
    }
  );

  const handleLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    const formValues = getValuesOnFormSubmit(event);

    const email = formValues.get("email") as string;
    const password = formValues.get("password") as string;

    try {
      await login({ email, password });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image
          className="h-20 w-71"
          src="/logo.webp"
          alt="logo"
          width={384}
          height={108}
        />
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Faça login na sua conta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginForm}>
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
              <div className="flex flex-col space-y-4">
                <Button
                  htmlProps={{
                    type: "submit",
                  }}
                  loading={loading}
                >
                  Entrar
                </Button>
              </div>
            </form>
            <p className="text-sm font-light text-gray-500">
              Você não tem uma conta ainda?
              <Button
                type="link"
                htmlProps={{
                  onClick: () =>
                    setUserModelProps({ action: "add", open: true }),
                }}
              >
                Registre-se!
              </Button>
            </p>
          </div>
        </div>
      </div>
      <UserModal
        props={userModalProps}
        setProps={setUserModelProps}
        key="add-user-modal"
      />
    </section>
  );
};
