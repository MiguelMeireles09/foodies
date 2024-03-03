// pages/foodies/homepageCards/maisSaudaveis.js

import { useState, useEffect } from 'react';

export default function MaisSaudaveis() {
  const [receitas, setReceitas] = useState([]);

  const fetchReceitas = async () => {
    try {
      const response = await fetch('/api/receitas/filtrosPagInicial/maisSaudaveis');
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
      <p className='text-3xl text-center py-5'>Receitas Saudáveis:</p>
       <ul>
         {receitas.map(e => {
          return (
            <li key={e._id}>
              <p className='text-2xl py-2'>{e.titulo}</p>
              <p>Ingredientes: {e.ingredientes}</p>
              <p>Quantidades: {e.quantidades}</p>
              <p>Dificuldade: {e.dificuldade}</p>
              <p>TempoPreparo: {e.tempoPreparo}</p>
              <p>Calorias: {e.calorias}</p>
              <p>Preco: {e.preco}</p>
              <p>Likes: {(e.likes).length}</p>
              <p>Categoria: {e.categoria}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
