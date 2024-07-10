import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

const NewPasswordView = () => {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  const handleToken = (tk: ConfirmToken["token"]) => {
    setToken(tk);
  }

  const toggleIsValidToken = (value: boolean) => {
    setIsValidToken(value);
  }
  console.log(token);
  return (
    <>
        <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
        <p className="text-2xl font-light text-white mt-5">
            Ingresa el código que recibiste {''}
            <span className=" text-fuchsia-500 font-bold"> en tu e-mail</span>
        </p>
        {!isValidToken 
          ? <NewPasswordToken token={token} handleToken={handleToken} toggleIsValidToken={toggleIsValidToken}/>
          : <NewPasswordForm token={token}/> }
    </>
  )
}

export default NewPasswordView