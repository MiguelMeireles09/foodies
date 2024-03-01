import { useRouter } from 'next/router';

export default function CardFavoritos({ imagem, nomeComida, href }) {
    /* const router = useRouter();
  
    const handleCardClick = () => {
      router.push(href);
    }; */



    /* icon coracao deve mudar de cor caso tenha like/retire like isto possibilita que o card possa ser usado no pesquisas.
    pagina só deve recarregar no prox fetch  */
    return (
        <div className="w-full md:w-auto max-w-[calc(45%-1rem)] py-6 cursor-pointer">
          <div className="bg-cinzaClaro rounded-2xl flex flex-col items-center">
            <img src="/images/Mole.png" className="rounded-t-2xl w-full" />
            <div className="w-full flex justify-between items-center p-5">
              <p className="font-sans font-normal text-center text-base text-black">
                wqewqewqeewq
              </p>
              <img src="/favoritos/ComGosto.svg" className="inline-block" />
            </div>
          </div>
        </div>
      );
    }