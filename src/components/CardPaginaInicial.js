import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Card({ imagem, nomeComida , href }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(href);
  };
  return (
    <div className='w-full md:w-auto max-w-[calc(45%-1rem)] py-6 cursor-pointer' onClick={handleCardClick}> 
      <div className='bg-cinzaClaro rounded-2xl'>
        <img src={imagem} className='rounded-t-2xl' />
        <p className='font-sans font-normal text-center p-3 border-t-2 border-cinza text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-black'>{nomeComida}</p>
      </div>
    </div>
  );
}