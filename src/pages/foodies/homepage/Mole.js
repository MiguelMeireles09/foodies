// pages/foodies/homepageCards/pratosPrincipais.js

import { useState, useEffect } from 'react';

export default function pratosPrincipais() {
  const [receitas, setReceitas] = useState([]);

  const fetchReceitas = async () => {
    try {
      const response = await fetch('/api/receitas/filtrosPagInicial/categoria/sopa');
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
    <div className="min-h-screen">
      <p className='text-3xl text-center py-5'>Receitas Baratas:</p>
       <ul>
         {receitas.map(e => {
          return (
            <li>
              <img src={e.fotoReceita}/>
              <p className='text-2xl py-2'>{e.titulo}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

