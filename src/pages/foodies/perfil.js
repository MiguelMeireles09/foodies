import Image from "next/image";
import { useRouter } from "next/router";
import ProtectPage from "@/utils/hooks/protectPagesHook";
import { useEffect } from "react";

export default function PerfilPage() {
  const { loading, userData } = ProtectPage();
  const router = useRouter();

  useEffect(() => {
  }, [userData])

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/foodies/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="https://images-ext-1.discordapp.net/external/O9fOp7KHXEPsHYJZfIAl_6WlcubBa-W3qkn9QKDVCA0/https/x.yummlystatic.com/web/spinner-light-bg.gif?width=250&height=250" alt="Loading..."></img>
      </div>
    )
  }

  return (
    <div className="flex flex-col  min-h-screen pt-12">
      <div className="relative mb-4 pb-16">
        <div className=" flex justify-center">
          <Image
            src="/images/chapeuPerfil.svg"
            alt="Chapeu Chef"
            className="rounded-full"
            width={200}
            height={200}
          />
        </div>
        <div className="flex w-90  h-90 rounded-full justify-center">
          <Image
            src="/images/Top10Receitas.png"
            alt="Perfil Imagem"
            className="rounded-full w-90 h-90"
            width={350}
            height={350}
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center ">
        <h1>Nome Utilizador:</h1>
        <h1>{userData.nomeUsuario}</h1>
        <h1>Email do Utilizador:</h1><h1> {userData.email}</h1>
        <button className="bg-verde rounded-xl p-4 mt-32" onClick={handleLogout}>Terminar Sessão</button>
      </div>
    </div>
  );
}