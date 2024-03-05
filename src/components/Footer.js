import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="fixed bottom-0 w-full bg-white z-10">
      <div className="flex justify-around items-center border-t-2 border-gray-300 py-2">
        <Link href="/foodies/homepage">
          {router.route === "/foodies/homepage" ? (
            <Image src="/foooter/ChefHatFilled.svg" width="40" height="40" />
          ) : (
            <Image src="/cinzaclaro/Chef Hat.svg" width="40" height="40" />
          )}
        </Link>
        <Link href="/foodies/search">
          {router.route === "/foodies/search" ? (
            <Image src="/foooter/SearchFilled.svg" width="40" height="40" />
          ) : (
            <Image src="/cinzaclaro/Search.svg" width="40" height="40" />
          )}
        </Link>
        <Link href="/foodies/receita/publicar">
          {router.route === "/foodies/receita/publicar" ? (
            <Image src="/foooter/PlusFilled.svg" width="40" height="40" />
          ) : (
            <Image src="/cinzaclaro/Plus.svg" width="40" height="40" />
          )}
        </Link>
        <Link href="/foodies/favoritos">
          {router.route === "/foodies/favoritos" ? (
            <Image src="/foooter/HeartFilled.svg" width="40" height="40" />
          ) : (
            <Image src="/cinzaclaro/Heart.svg" width="40" height="40" />
          )}
        </Link>
        <Link href="/foodies/perfil">
          {router.route === "/foodies/perfil" ? (
            <Image src="/foooter/UserFilled.svg" width="40" height="40" />
          ) : (
            <Image src="/cinzaclaro/User.svg" width="40" height="40" />
          )}
        </Link>
      </div>
    </footer>
  );
}

