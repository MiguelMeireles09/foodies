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
    return <div>Loading...</div>; // Or any loading spinner
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
        <div className="flex justify-center">
          <Image
            src="/images/BottomBackgroundFoodies.png"
            alt="Perfil Imagem"
            className="rounded-full"
            width={350}
            height={400}
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