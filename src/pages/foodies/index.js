import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [receitas, setReceitas] = useState([]); // State for recipe suggestions
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


  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/foodies/search',
      query: { query: inputValue },
    },"/foodies/search");
  };

  return (
    <div className="bg-image min-h-screen">
      <main className="relative flex flex-col items-center justify-center min-h-screen p-24">
        <img src="/images/LogoInicial.svg" className="pb-2" />
        
        <form onSubmit={handleSubmit} className="flex flex-col justify-center align-middle">
          <input
            list="receitas-list" 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Qual o alimento que tem para hoje?"
            className="bg-cinzaClaro border-verde border-2 placeholder-verde p-5 mb-2 rounded-3xl h-20 w-50 text-center "
          />
          <datalist id="receitas-list"> 
            {receitas.map((receita, index) => (
              <option key={index} value={receita.nome} /> 
            ))}
          </datalist>
          <div className="align-center text-center justify-center flex flex-col px-28">
            <button type="submit" className="bg-verde p-2 rounded-xl flex align-middle justify-center text-center text-white">
              Procurar
            </button>
          </div>
        </form>
        <Link href="/foodies/homepage">Ver Todas.</Link>
      </main> 
    </div>
  );
}
