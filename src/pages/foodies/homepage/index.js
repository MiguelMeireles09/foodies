// pages/foodies/homepage/index.js

import Card from '@/components/CardPaginaInicial';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const {token}= router.query

  
  console.log(token)
  return (
    <div className="py-6 min-h-screen px-8 md:px-14 lg:px-20 xl:px-28 ">
      <p className=' text-center font-bold  text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl'>“O segredo está na receita - descubra-a connosco.”</p>
      <div className='flex flex-wrap justify-around pb-4'>
        <Card imagem="/images/Top10Receitas.png" nomeComida="Top 10 Receitas" href="/foodies/homepage/top10" />
        <Card imagem="/images/ReceitasRapidas.png" nomeComida="Receitas Rápidas" href="/foodies/homepage/maisRapidas" />
        <Card imagem="/images/ReceitasFaceis.png" nomeComida="Receitas Fáceis" href="/foodies/homepage/maisFaceis" />
        <Card imagem="/images/ReceitasSaudaveis.png" nomeComida="Receitas Saudáveis" href="/foodies/homepage/maisSaudaveis" />
        <Card imagem="/images/ReceitasBaratas.png" nomeComida="Receitas Baratas" href="/foodies/homepage/maisBaratas" />
        <Card imagem="/images/PratosPrincipais.png" nomeComida="Pratos Principais" href="/foodies/homepage/pratosPrincipais" />
        <Card imagem="/images/Sobremesa.png" nomeComida="Sobremesas" href="/foodies/homepage/sobremesas" />
        <Card imagem="/images/Mole.png" nomeComida="Mole"  href="/foodies/homepage/Mole" />
      </div>
    </div>
  );   
}
