import Image from "next/image";
import { useRouter } from "next/router";
import ProtectPage from "@/utils/hooks/protectPagesHook";
import { useEffect } from "react";

export default function PerfilPage() {
  const { loading, userData } = ProtectPage();
  const router = useRouter();

  useEffect(() => {
    console.log(userData);
  }, [userData]); // Logging userData whenever it changes

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
      <h1>Nome Utilizador: {userData.nomeUsuario}</h1>
      <h1>Email do Utilizador: {userData.email}</h1>
      <button onClick={handleLogout}>Terminar Sessão</button>
    </div>
  );
}
