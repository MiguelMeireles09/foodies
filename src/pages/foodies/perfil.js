import Link from "next/link";
import Image from "next/image";
import protectPage from "@/utils/hooks/protectPagesHook";
import { router } from "next/router";

export default function PerfilPage() {

  //calling function to protect the page 
  // to redirect if token not exist
  protectPage()

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Additional logout logic (e.g., redirecting to login page)
    router.push("/foodies/login");
  };




  return (
    <div className="">
      <div className="flex justify-center perfilImagem">
        <div className="">
          <Image
            src="/images/BottomBackgroundFoodies.png"
            className="rounded-full"
            width={200}
            height={200}
          />
          <div>Nome do utilizador:</div>
        </div>
      </div>
      <button onClick={handleLogout}>Terminar Sessao</button>
    </div>
  );
}
