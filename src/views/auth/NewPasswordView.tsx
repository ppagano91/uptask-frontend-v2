import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";

const NewPasswordView = () => {
    const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
        <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
        <p className="text-2xl font-light text-white mt-5">
            Ingresa el código que recibiste {''}
            <span className=" text-fuchsia-500 font-bold"> en tu e-mail</span>
        </p>
        {!isValidToken ? <NewPasswordToken/> : <NewPasswordForm /> }
    </>
  )
}

export default NewPasswordView