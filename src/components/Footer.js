import Image from "next/image";

export default function Footer() {
  return (
    <footer className="grid justify-center fixed w-full bottom-0 flex-col">
      <div className="col-span-3">
        <Image src="/row.png" width="500" height="2" />
      </div>
      <div className="flex gap-11 justify-center footer pt-2">
        <Image src="/logofooter.png" width="60" height="60" />
        <Image src="/heart.png" width="50" height="50" />
        <Image src="/person1.png" width="50" height="50" />
      </div>
    </footer>
  );
}
