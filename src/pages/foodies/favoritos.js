import React, { useEffect, useState } from 'react';
import CardFavoritos from "@/components/CardFavoritos";
import ProtectPage from "@/utils/hooks/protectPagesHook";

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
        method: 'POST', // Using POST to send data in the body
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as necessary, such as Authorization headers
        },
        body: JSON.stringify({ idDoUsuario }) // Sending the user ID in the body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch favorite recipes');
      }

      const data = await response.json();
      setFavoritos(data); // Assuming the API returns an array of favorite recipes
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
      // Handle error appropriately
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Nome Utilizador: {userData.nomeUsuario}</h1>
      <h1>Id: {userData._id}</h1>
      <h1>Email Utilizador: {userData.email}</h1>
      {favoritos.map((recipe) => (
        <h1> 
         Id Receita = {recipe._id} Nome Receita = {recipe.titulo} Imagem Receita = {recipe.fotoReceita}
        </h1>
          
      ))}
    </div>
  );
}
