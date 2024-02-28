import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-white">
      <div className="flex justify-around items-center border-t-2 border-gray-300 py-2">
        <Link href="/foodies/paginaInicial">
          <Image src="/footer/logofooter.png" width="40" height="40" />
        </Link>
        <Link href="/foodies/search">
          <Image src="/footer/search.png" width="40" height="40" />
        </Link>
        <Link href="/foodies/favoritos">
          <Image src="/footer/heart.png" width="40" height="40" />
        </Link>
        <Link href="/foodies/perfil">
          <Image src="/footer/person1.png" width="40" height="40" />
        </Link>
      </div>
    </footer>
  );
}