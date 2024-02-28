import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-white">
      <div className="flex justify-around items-center border-t-2 border-gray-300 py-2">
        <Link href="/foodies/paginaInicial">
          <Image src="/logofooter.png" width="60" height="60" />
        </Link>
        <Link href="/foodies/favoritos">
          <Image src="/heart.png" width="50" height="50" />
        </Link>
        <Link href="/foodies/perfil">
          <Image src="/person1.png" width="50" height="50" />
        </Link>
      </div>
    </footer>
  );
}