import Link from "next/link";
import Image from "next/image"


export default function NavBar() {
    return (
        <nav className="bg-white text-black flex justify-between">
            <div>
          <Image src="/FOODIES.png" className="p-10" width="200" height="40" />
              
          </div>
        </nav>
    )
}