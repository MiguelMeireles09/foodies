import Image from 'next/image';

export default function Card({ imageSrc, title }) {
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <div className="relative">
        <Image 
          src={imageSrc}
          width={200} // Defina a largura da imagem
          height={107} // Defina a altura da imagem
          objectFit="cover" // Isso garante que a imagem cubra o espaço disponível
          alt="Imagem do card"
        />
        <div className="absolute bottom-0 w-full bg-white bg-opacity-80">
          <p className="text-center font-bold text-lg p-2">{title}</p>
        </div>
      </div>
    </div>
  );
}