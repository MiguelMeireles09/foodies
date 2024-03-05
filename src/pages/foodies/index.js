import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [alimentoQueQuer, setAlimentoQueQuer] = useState("");
  const [receitas, setReceitas] = useState([]); // State for recipe suggestions
  const [erroIncluir, setErroIncluir] = useState("");
  const router = useRouter();

  const fetchReceitas = async () => {
    try {
      const response = await fetch("/api/receitas/todasReceitas");
      if (!response.ok) {
        throw new Error("Falha ao buscar receitas");
      }
      const data = await response.json();
      setReceitas(data); // Correctly set the fetched recipes to the state
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };
  
  useEffect(() => {
    fetchReceitas();
  }, []);


  // 'alimentosUnicosArray' = array com todos os alimentos das receitas sem repetidos
  const alimentosArray = receitas.reduce((accumulator, current) => {
    accumulator.push(...current.ingredientes);
    return accumulator;
  }, []);

  const alimentosUnicosArray = Array.from(new Set(alimentosArray));


  // Função que é executada quando o form 'INCLUIR' é submetido (carregando no enter)
  const handleIncluir = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao enviar o formulário
    const novoAlimento = alimentoQueQuer.charAt(0).toUpperCase() + alimentoQueQuer.slice(1); // Passa a primeira letra do nome submetido para maiúscula caso não seja

    if (!alimentosUnicosArray.includes(novoAlimento)) {
      setErroIncluir("Alimento não encontrado");
      setTimeout(() => {
        setErroIncluir("");
      }, 1000);
      return;
    }

    router.push({
      pathname: '/foodies/search',
      query: { query: novoAlimento }
    },"/foodies/search");
  };



  return (
    <div className="bg-image min-h-screen">
      <main className="relative flex flex-col items-center justify-center min-h-screen p-24">
        <img src="/images/LogoInicial.svg" className="pb-2" />

        {/* Mostra a mensagem de erro do incluir alimento, se houver */}
        {erroIncluir && <p className="text-red-500 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{erroIncluir}</p>}

        {/* Barra de pesquisa para incluir alimento */}
        <form onSubmit={handleIncluir} className="flex flex-col justify-center align-middle text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          <input list="alimentoQueQuer" type="text" placeholder="Que ingrediente tem para hoje?" value={alimentoQueQuer} onChange={(e) => setAlimentoQueQuer(e.target.value)} className="bg-cinzaClaro border-verde border-2 placeholder-verde p-5 mb-2 rounded-3xl h-20 w-50 text-center"/>
          <Link className="underline text-right lg:pb-10" href="/foodies/search">ver receitas</Link>
          <datalist id="alimentoQueQuer">
            {alimentosUnicosArray.map((e, index) => (
              <option key={index} value={e} />
            ))}
          </datalist>
          <div className="align-center text-center justify-center flex flex-col px-28">
            
            <button type="submit" className="bg-verde p-2 px-8 rounded-xl flex align-middle justify-center text-center text-white ">
              Vamos começar
            </button>
          </div>
        </form>
      </main> 
    </div>
  );
}
