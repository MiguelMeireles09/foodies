import React, { useEffect, useState } from "react";
import ProtectPage from "@/utils/hooks/protectPagesHook";
import { useRouter } from "next/router";
import Link from "next/link";
import BotaoRemoverLike from "../botoes/BotaoRemoverLike";

export default function UserFavoritosPage() {
  const [pagina, setPagina] = useState("Favoritos");
  const { loading: userLoading, userData } = ProtectPage();
  const [favoritos, setFavoritos] = useState([]);
  const [receitasUser, setReceitasUser] = useState([]);
  const [loadingFavoritos, setLoadingFavoritos] = useState(false);
  const [loadingReceitas, setLoadingReceitas] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [receita, setReceita] = useState(null)

  // Favoritos que o usuario deu like
  const Favoritos = async (idDoUsuario) => {
    setLoadingFavoritos(true);
    try {
      const response = await fetch(`/api/user/receitasFav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idDoUsuario }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch favorite recipes");
      }

      const data = await response.json();
      setFavoritos(data);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
    setLoadingFavoritos(false);
  };

  const [imagemAtual, setImagemAtual] = useState('/receitainfo/Favorite.svg')

  const handleTrocarImagem = async (userId, recipeId) => {
    if (!userId || !recipeId) {
      console.log("Missing user ID or recipe ID.");
      return;
    }
  
    // Muda O coracao antes de saber a resposta do backend
    const updatedFavoritos = favoritos.map(recipe => {
      if (recipe._id === recipeId) {
        return { ...recipe, isFavorite: !recipe.isFavorite }; 
      }
      return recipe;
    });
  
    setFavoritos(updatedFavoritos);
  
    try {
      const payload = {
        idUsuario: userId,
        idReceita: recipeId,
      };
      // remove like / volta a adicionar
      const response = await fetch('/api/user/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle like status');
      }
      // volta a fazer fetch a favoritos / refresh na pagina 
      await Favoritos(userId);
  
    } catch (error) {
      console.error('Error toggling like status:', error);
    
    }
  };

/*   // Confirmar se quer remover dos favoritos
  const handleConfirm = () => {
    alert("Confirmed!");
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const removerLike = () => {
    setIsOpen(!isOpen);
  }; */

  useEffect(() => {
    if (!userLoading && userData?._id) {
      Favoritos(userData._id);
    }
  }, [userLoading, userData]);

  const handleImagemClick = (recipe) => {
    const receitaSelecionada = recipe.titulo;
    router.push({
      pathname: "/foodies/receita",
      query: { query: receitaSelecionada },
    });
  };


  const handlePageChange = (newPage) => {
    setPagina(newPage);
  };

  if (userLoading || loadingFavoritos)
    return (
      <div className="flex flex-col justify-center items-center h-screen pb-40">
        <img
          src="https://images-ext-1.discordapp.net/external/O9fOp7KHXEPsHYJZfIAl_6WlcubBa-W3qkn9QKDVCA0/https/x.yummlystatic.com/web/spinner-light-bg.gif?width=250&height=250"
          alt="Loading..."
        ></img>
      </div>
    );



  return (
    <div>
      <p className="text-center py-5 text-2xl 2xl:text-4xl">
        Os teus favoritos:
      </p>
      {favoritos.length === 0 && (
        <div>
          Ainda não tens nenhuma receita adicionada aos teus favoritos.{" "}
          <a className="text-verde font-bold" href={"/foodies/search"}>Adiciona-a aqui!</a>
        </div>
      )}
      <div className="flex flex-wrap mb-10 pb-10">
        {favoritos.map((recipe) => (
          <div key={recipe._id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between">
              <img
                onClick={() => handleImagemClick(recipe)}
                src={recipe.fotoReceita}
                alt="Favorite Recipe"
                className="rounded-t-2xl w-full h-40 object-cover"
              />
              <div className="flex-grow flex flex-col justify-center border-t-2 border-cinza">
                <div onClick={() => handleTrocarImagem(userData._id, recipe._id)}>
                  <img src={recipe.isFavorite ? "/receitainfo/FavoriteBorder.svg" : "/receitainfo/Favorite.svg"} width="20" height="20" />
                </div>
                <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">
                  {recipe.titulo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
