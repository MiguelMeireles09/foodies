import { Carousel } from "@material-tailwind/react";
import { useState, useEffect } from 'react';

export default function Top10() {
  const [receitas, setReceitas] = useState([]);
  const [page, setPage] = useState(0);

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

  const goToPrevious = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : receitas.length - 1));
  };

  const goToNext = () => {
    setPage((prevPage) => (prevPage + 1) % receitas.length);
  };

  return (
    <main className="relative flex h-[calc(100vh-70px)] w-screen flex-col justify-center items-center">
      {receitas.length > 0 ? (
        <>
          <button onClick={goToPrevious} className="absolute left-0 z-10">Prev</button>
          <div className="w-full p-10">
            <img src={receitas[page].fotoReceita} className="w-full h-full object-cover object-center" alt={receitas[page].titulo}/>
            <div className="absolute bottom-8 left-10 py-3 px-6 bg-white rounded-lg">
              <h2 className="text-4xl">{receitas[page].titulo}</h2>
              <p className="text-2xl mt-4 text-verde">Magia</p>
            </div>
          </div>
          <button onClick={goToNext} className="absolute right-0 z-10">Next</button>
        </>
      ) : (
        <p>Carregando receitas...</p>
      )}
    </main>
  );
}
