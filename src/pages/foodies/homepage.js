import { useState, useEffect } from 'react';

export default function Home() {
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



  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className='text-xl'>Todas as Receitas</h1>
      <ul>
        {receitas.map(receita => {
          console.log(receita);
          return (
            <li key={receita._id}>
              <h1>{receita.titulo}</h1>
              <h3>{receita.modoPreparo}</h3>
            </li>
          )
        })}
      </ul>
    </div>
  );  
}
