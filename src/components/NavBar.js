import Image from "next/image";

export default function NavBar() {
    return (
        <nav className="bg-white text-black flex pl-12 md:pl-28 lg:pl-32 xl:pl-42 sticky top-0 z-50">
            <div>
                <Image src="/images/FOODIES.svg" className="pt-6 pb-4" width="202" height="40" />
            </div>
        </nav>
    );
}