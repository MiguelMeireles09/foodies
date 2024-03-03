
import { useState, useEffect } from 'react';

export default function Sobremesa() {
  const [receitas, setReceitas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchReceitas = async () => {
    try {
      const response = await fetch('/api/receitas/filtrosPagInicial/categoria/sobremesa');
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
    const isFirstRecipe = currentIndex === 0;
    const newIndex = isFirstRecipe ? receitas.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastRecipe = currentIndex === receitas.length - 1;
    const newIndex = isLastRecipe ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="min-h-screen">
      <p className='text-3xl text-center py-5'>Receitas Baratas:</p>
      {receitas.length > 0 && (
        <div>
          <button onClick={goToPrevious}>Previous</button>
          <div>
            <img src={receitas[currentIndex].fotoReceita} alt={receitas[currentIndex].titulo} style={{ width: '100%', height: 'auto' }} />
            <p className='text-2xl py-2 text-center'>{receitas[currentIndex].titulo}</p>
          </div>
          <button onClick={goToNext}>Next</button>
        </div>
      )}
    </div>
  )}