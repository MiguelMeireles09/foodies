import Image from "next/image"

export default function Footer() {
    return (
        <footer className="bg-black text-white fixed w-full bottom-0">
            <p>
            <span>Nome Projeto</span>
            &copy; 2024</p>
            <Image src="/images/heart.png" width="40" height="40" />
        </footer>
    )
}