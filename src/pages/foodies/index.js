import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {

  // coisas necessárias para obter as receitas
  const [receitas, setReceitas] = useState([]);

  const fetchReceitas = async () => {
    try {
      const response = await fetch('/api/receitas/todasReceitas');
      if (!response.ok) {
        throw new Error('Falha ao buscar receitas');
      }
      const data = await response.json();
      setReceitas(data);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  useEffect(() => {
    fetchReceitas();
  }, []);

  // Array com todos os alimentos existentes
  const alimentosArray = receitas.reduce((accumulator, current) => {
    accumulator.push(...current.ingredientes);
    return accumulator;
  }, []);
  
  const alimentosUnicosArray = Array.from(new Set(alimentosArray));

  // State para guardar o alimentos
  let [alimento, setAlimento] = useState("");
  const [alimentosQueQuer, setAlimentosQueQuer] = useState([]);
  const [alimentosQueNaoQuer, setAlimentosQueNaoQuer] = useState([]);

  // State para guardar a mensagem de erro
  const [error, setError] = useState("");



  const handleLogin = (e) => {
    e.preventDefault();                                                         // Evita o comportamento padrão de recarregar a página ao enviar o formulário
    const novoAlimento = alimento.charAt(0).toUpperCase() + alimento.slice(1);  // Passa a primeira letra do nome submetido para maiúscula caso não seja

    if (!alimentosUnicosArray.includes(novoAlimento)) {                         // Se o alimento submetido não estiver na lista erro = "Alimento não encontrado"
        setError("Alimento não encontrado");
        return;
    }

    // Adiciona o novo alimento ao array de alimentos
    setAlimentosQueQuer(prevAlimentos => [...prevAlimentos, novoAlimento]);
    // Limpa o campo de entrada
    setAlimento("");
  };

  // Receitas com alimentos pretendidos e sem alimentos indesejados
  const receitasPretendidas = receitas.filter(e =>
    (alimentosQueQuer.length === 0 ||  e.ingredientes.some(ingrediente => alimentosQueQuer.includes(ingrediente))) &&
    (alimentosQueNaoQuer.length === 0 || !e.ingredientes.some(ingrediente => alimentosQueNaoQuer.includes(ingrediente)))
  );

  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen w-full p-10">
      {/* Barra de Pesquisa */}
      <form onSubmit={handleLogin} className="mb-4">
          <input list="alimento" type="text" placeholder="Qual o alimento que tem para hoje?" value={alimento} onChange={(e) => setAlimento(e.target.value)} className="border border-gray-400 rounded-xl p-2 w-full m-2"/>
          <datalist id="alimento">
              {alimentosUnicosArray.map((e, index) => (
                  <option key={index} value={e} />
              ))}
          </datalist>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl ml-2">Ver Receitas</button>
      </form>

      {/* Mostra a mensagem de erro, se houver */}
      {error && <p className="text-red-500">{error}</p>}

      <p className='text-xl text-center py-5'>Alimentos Pretendidos: {alimentosQueQuer == "" ? "Nenhum": alimentosQueQuer}</p>
      <p className='text-xl text-center py-5'>Alimentos Não Pretendidos: {alimentosQueNaoQuer == "" ? "Nenhum" : alimentosQueNaoQuer}</p>
      <p className='text-3xl text-center py-5'>Receitas:</p>
       <ul>
         {receitasPretendidas.map(e => {
          return (
            <li key={e._id}>
              <p className='text-2xl py-2'>{e.titulo}</p>
              <p>Ingredientes: {e.ingredientes}</p>
              <p>Quantidades: {e.quantidades}</p>
              <p>Dificuldade: {e.dificuldade}</p>
              <p>TempoPreparo: {e.tempoPreparo}</p>
              <p>Calorias: {e.calorias}</p>
              <p>Preco: {e.preco}</p>
              <p>Likes: {e.likes}</p>
              <p>Categoria: {e.categoria}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
