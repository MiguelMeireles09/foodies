import Image from "next/image";

export default function NavBar() {
    return (
        <nav className="bg-white text-black flex pl-11 sticky top-0 z-50">
            <div>
                <Image src="/images/FOODIES.png" className="pt-6 pb-4" width="200" height="40" />
            </div>
        </nav>
    );
}