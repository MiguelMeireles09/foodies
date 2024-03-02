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
    <div>
      <div className="flex justify-center perfilImagem">
        <Image
          src="/images/BottomBackgroundFoodies.png"
          alt="Perfil Imagem"
          className="rounded-full"
          width={200}
          height={200}
        />
      </div>
      <div className="w-40 flex flex-col align-middle justify-center">
      <h1 className="justify-center flex">Nome Utilizador: {userData.nomeUsuario}</h1>
      <h1 className="justify-center flex">Email do Utilizador: {userData.email}</h1>
      <button className=" bg-verde rounded-xl p-4 " onClick={handleLogout}>Terminar Sessão</button>
      </div>
    </div>
  );
}
