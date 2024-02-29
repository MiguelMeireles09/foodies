import Image from "next/image";

export default function Header() {
    return (
        <nav className="bg-white border-b-2 text-black flex pl-12 md:pl-20 lg:pl-28 xl:pl-40 sticky top-0 z-50">
            <div>
                <Image src="/images/FOODIES.svg" className="pt-6 pb-4" width="202" height="40" />
            </div>
        </nav>
    );
}