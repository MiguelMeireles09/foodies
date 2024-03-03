import React, { useEffect, useState } from 'react';
import CardFavoritos from "@/components/CardFavoritos";
import ProtectPage from "@/utils/hooks/protectPagesHook";
import ReceitaInfo from './receita';
import Link from 'next/link';
import { router } from 'next/router';

export default function FavoritosPage() {
  const { loading, userData } = ProtectPage();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    if (!loading && userData?._id) {
      fetchFavoritos(userData._id);
    }
  }, [loading, userData]);

  const fetchFavoritos = async (idDoUsuario) => {
    try {
      const response = await fetch(`/api/user/receitasFav`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idDoUsuario })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch favorite recipes');
      }

      const data = await response.json();
      setFavoritos(data); // Assuming the API returns an array of favorite recipes
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
    }
  };

  const handleImagemClick = (recipe) => {
    const receitaSelecionada = recipe.titulo
    console.log("Receita clicada:", receitaSelecionada);
    router.push({
      pathname: '/foodies/receita',
      query: { query: receitaSelecionada }
    });
  }
  

  if (loading) return <div>Loading...</div>;

  return (
    <main className="justify-center items-start text-center w-full overflow-hidden min-h-screen px-4 md:px-14 lg:px-20 xl:px-28 pt-5" >


        {/* mesmo card do search , fica meio estragado quando apenas temos uma receita */}
        <p className="text-center py-5 text-2xl 2xl:text-4xl">Os teus favoritos:</p>
        {favoritos.length === 0 && (
        <div>Ainda não tens nenhuma receita adicionada aos teus favoritos. <Link href={"/foodies/search"}>Adiciona aqui :)</Link></div>
      )}
        <div className="flex flex-wrap mb-10 pb-10">
        {favoritos.map((recipe) => ( // Changed 'e' to 'recipe' for clarity
          <div key={recipe._id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4"> {/* Ensure recipe._id is the correct key */}
            <div onClick={() => handleImagemClick(recipe)} className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between">
              <img  src={recipe.fotoReceita} alt="Favorite Recipe" className="rounded-t-2xl w-full h-40 object-cover" /> {/* Added alt attribute for accessibility */}
              <div className="flex-grow flex flex-col justify-center border-t-2 border-cinza">
                <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">{recipe.titulo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

