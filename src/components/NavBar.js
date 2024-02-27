import Link from "next/link";
import Image from "next/image"


export default function NavBar() {
    return (
        <nav className="bg-white text-black flex justify-center">
            <div>
          <Image src="/images/FOODIES.png" className="p-8" width="200" height="40" />
              
          </div>
        </nav>
    )
}