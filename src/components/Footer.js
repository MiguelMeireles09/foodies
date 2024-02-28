import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="fixed bottom-0 w-full bg-white">
      <div className="flex justify-around items-center border-t-2 border-gray-300 py-2">
        <Link href="/foodies/homepage">
        {router.route === "/foodies/homepage" ? (
          <Image src="/footer/PanelaCheia.svg" width="40" height="40" />
        ) : (
          <Image src="/footer/PanelaVazia.svg" width="40" height="40" />
        )}
        </Link>
        <Link href="/foodies/search">
          {router.route === "/foodies/search" ? (
          <Image src="/footer/searching.svg" width="36" height="36" />
          ):(
          <Image src="/footer/search.svg" width="36" height="36" />
          )}
        </Link>
        <Link href="/foodies/favoritos">
        {router.route === "/foodies/favoritos" ? (
          <Image src="/footer/Heartfull.svg" width="40" height="40" />
        ):(
          <Image src="/footer/heart.png" width="40" height="40" />
        )}
        </Link>
        <Link href="/foodies/perfil">
          <Image src="/footer/person1.png" width="40" height="40" />
        </Link>
      </div>
    </footer>
  );
}