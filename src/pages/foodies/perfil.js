import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function PerfilPage() {
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
        </div>
      </div>
      <Link href="/foodies/login">Terminar Sessao</Link>
    </div>
  );
}
