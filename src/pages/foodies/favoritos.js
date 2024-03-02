import ProtectPage from "@/utils/hooks/protectPagesHook";
import { useEffect, useState } from "react";

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

  const removeFavorite = async (recipeId) => {
    try {
      const response = await fetch(`/api/user/receitasFav/${recipeId}`, {
        method: 'DELETE', // Assuming DELETE method is used to remove a recipe from favorites
        headers: {
          'Content-Type': 'application/json', 
          
        },
        body: JSON.stringify({ idDoUsuario: userData._id })
      });

      if (!response.ok) {
        throw new Error('Failed to remove favorite recipe');
      }

      // Filter out the unfavorited recipe from the local state to update the UI
      setFavoritos(favoritos.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error removing favorite recipe:', error);
    }
  };

  // Render your favorite recipes here
  return (
    <div>
      {favoritos.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.titulo}</h3>
          {/* Additional recipe details */}
          <button onClick={() => removeFavorite(recipe._id)}>Remove Favorite</button>
        </div>
      ))}
    </div>
  );
}