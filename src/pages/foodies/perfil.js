import { useRouter } from "next/router";
import ProtectPage from "@/utils/hooks/protectPagesHook";
import { useEffect, useState} from "react";
import UserProfile from "@/components/profile/ProfileImage";

export default function PerfilPage() {
  const { loading, userData } = ProtectPage();
  const router = useRouter();

  useEffect(() => {}, [userData]);

  console.log("userdata:", userData);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/foodies/login");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen pb-40">
        <img
          src="https://images-ext-1.discordapp.net/external/O9fOp7KHXEPsHYJZfIAl_6WlcubBa-W3qkn9QKDVCA0/https/x.yummlystatic.com/web/spinner-light-bg.gif?width=250&height=250"
          alt="Loading..."
        ></img>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center h-72">
        <div className="p-8 w-full">
          <img
            src="/receitainfo/arrowBack.svg"
            className=""
            onClick={() => router.back()}
            width="40"
            height="40"
          />
          <div className="flex justify-center items-center pt-10">
            <UserProfile  />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-5 px-5 pt-16">
        <div className="flex w-full pt-14">
          <div className=" flex  w-4/12 py-2 justify-start">
            <div className="flex">
              <img
                src="/PerfilPage/person.svg"
                width="15"
                heigth="15"
                className="mr-2"
              />
            </div>
            Nome
          </div>
          <div className="bg-cinzaClaro bg-opacity-40 rounded-xl flex w-8/12 indent-5 items-center">
            {userData.nomeUsuario}
          </div>
        </div>
        <div className="flex w-full">
          <div className=" flex  w-4/12 py-2 justify-start">
            <div className="flex">
              <img
                src="/PerfilPage/email.svg"
                width="15"
                heigth="15"
                className="mr-2"
              />
            </div>
            E-mail
          </div>
          <div className="bg-cinzaClaro  bg-opacity-40 rounded-xl flex w-8/12 indent-5 items-center">
            {userData.email}
          </div>
        </div>
        <div className="flex w-full">
          <div className=" flex  w-4/12 py-2 justify-start">
            <div className="flex">
              <img
                src="/PerfilPage/phone.svg"
                width="15"
                heigth="15"
                className="mr-2"
              />
            </div>
            Contacto
          </div>
          <div className="bg-cinzaClaro bg-opacity-40 rounded-xl flex w-8/12 indent-5 items-center">
            {userData.contacto}
          </div>
        </div>
        <div className="pt-32">
          <button
            className="bg-verde text-white font-bold py-2 text-bold px-4 rounded-lg"
            onClick={handleLogout}
          >
            Terminar Sessão
          </button>
        </div>
      </div>
    </div>
  );
}
