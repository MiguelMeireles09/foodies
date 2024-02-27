import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-white text-black flex justify-between">
            <div>
                <h1 className="ml-10 p-3">Nome Projeto</h1>
            </div>
            <ul className="mr-10 p-3 flex gap-5">
                <li>
                    <Link href="/">Home</Link>
                </li><li>
                    <Link href="/">Coisas</Link>
                </li>
            </ul>
        </nav>
    )
}