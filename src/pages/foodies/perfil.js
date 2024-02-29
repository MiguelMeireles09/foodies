import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function PerfilPage() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

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
          <div>Nome do utilizador:{`token:${token}`}</div>
        </div>
      </div>
      <Link href="/foodies/login">Terminar Sessao</Link>
    </div>
  );
}
