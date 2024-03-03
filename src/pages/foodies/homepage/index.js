// pages/foodies/homepage/index.js


import MaisGostadas from "@/components/PaginaInicial/MaisGostadas";
import MaisRapidas from "@/components/PaginaInicial/MaisRapidas";
import Entradas from "@/components/PaginaInicial/Entradas";
import Lanches from "@/components/PaginaInicial/Lanches";
import MaisBaratas from "@/components/PaginaInicial/MaisEconomicas";
import MaisFaceis from "@/components/PaginaInicial/MaisFaceis";
import Sopas from "@/components/PaginaInicial/Sopas";
import PratosPrincipais from "@/components/PaginaInicial/PratosPrincipais";
import Sobremesas from "@/components/PaginaInicial/Sobremesas";
import MaisSaudaveis from "@/components/PaginaInicial/MaisSaudaveis";

export default function Home() {
  return (
    <div className="py-6 min-h-screen md:px-14 lg:px-20 xl:px-28 ">
      <p className=" text-center font-bold  text-xl sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        “O segredo está na receita - descubra-a connosco.”
      </p>
      <p className=" text-center font-bold  text-xl sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        Confira o nosso top 10
      </p>

      <div className=" flex flex-wrap justify-around pb-14">
        <MaisGostadas />
        <Entradas />
        <Lanches />
        <MaisBaratas />
        <MaisFaceis />
        <Sopas />
        <MaisRapidas />
        <MaisSaudaveis />
        <PratosPrincipais />
        <Sobremesas />
      </div>
    </div>
  );
}
