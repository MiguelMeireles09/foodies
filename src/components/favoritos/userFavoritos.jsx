import React, { useEffect, useState } from "react";
import ProtectPage from "@/utils/hooks/protectPagesHook";
import { useRouter } from "next/router";
import Link from "next/link";
import BotaoRemoverLike from "../botoes/BotaoRemoverLike";
import { Receipt } from "@mui/icons-material";

export default function UserFavoritosPage() {
  const [pagina, setPagina] = useState("Favoritos");
  const { loading: userLoading, userData } = ProtectPage();
  const [favoritos, setFavoritos] = useState([]);
  const [loadingFavoritos, setLoadingFavoritos] = useState(false);
  const router = useRouter();
  const [receita, setReceita] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false)


  const fetchFavoritos = async (userId) => {
    setLoadingFavoritos(true);
    try {
      const response = await fetch(`/api/user/receitasFav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idDoUsuario: userId }),
      });
      if (!response.ok) {
        throw new Error("Falha encontrar favoritos");
      }
      const data = await response.json();
      setFavoritos(data);
    } catch (error) {
      console.error("Erro procurar receitas.", error);
    }
    setLoadingFavoritos(false);
  };

  const handleToggleLike = async (userId, recipeId, isFavorite) => {
    if (!userId || !recipeId) {
      console.log("Falta usuario ou receita.");
      return;
    }


    setReceita({ userId, recipeId });
    setConfirmationOpen(true);
  }


  const handleConfirm = async () => {
    const { userId, recipeId } = receita;
    try {
      const payload = {
        idUsuario: userId,
        idReceita: recipeId,
      }
      const response = await fetch('/api/user/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Falha a remover like');
      }
    
      await fetchFavoritos(userId);
    } catch (error) {
      console.error('Erro em remover like:', error);
    }
 
    setConfirmationOpen(false);
  };


  const handleCancel = () => {

    setConfirmationOpen(false);
  };

  const handleRecipeClick = (recipe) => {
    router.push({
      pathname: "/foodies/receita",
      query: { query: recipe.titulo },
    });
  };


  useEffect(() => {
    if (!userLoading && userData?._id) {
      fetchFavoritos(userData._id);
    }
  }, [userLoading, userData]);

  if (userLoading || loadingFavoritos)
    return (
      <div className="flex flex-col justify-center items-center h-screen pb-40">
        <img
          src="https://images-ext-1.discordapp.net/external/O9fOp7KHXEPsHYJZfIAl_6WlcubBa-W3qkn9QKDVCA0/https/x.yummlystatic.com/web/spinner-light-bg.gif?width=250&height=250"
          alt="Loading..."
        />
      </div>
    )

  return (
    <div>
      <p className="text-center py-5 text-2xl 2xl:text-4xl">Os teus favoritos:</p>
      {favoritos.length === 0 && (
        <div>
          Ainda não tens nenhuma receita adicionada aos teus favoritos.{" "}
          <Link href={"/foodies/search"} className="text-verde font-bold">Adiciona-a aqui!
          </Link>
        </div>
      )}
      <div className="flex flex-wrap mb-10 pb-10">
        {favoritos.map((recipe) => (
          <div key={recipe._id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between">
              <div onClick={() => handleRecipeClick(recipe)} className="rounded-t-2xl w-full h-40 object-cover cursor-pointer bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${recipe.fotoReceita})` }}>
                <div className="flex justify-end items-end h-full w-full">
                  <div className="m-3" onClick={(e) => { e.stopPropagation(); handleToggleLike(userData._id, recipe._id, recipe.isFavorite); }}>
                    <img src={recipe.isFavorite ? "/receitainfo/FavoriteBorder.svg" : "/receitainfo/Favorite.svg"} width="30" height="30" />
                  </div>
                </div>
              </div>
              <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">
                {recipe.titulo}
              </p>
            </div>
          </div>
        ))}
      </div>
      <BotaoRemoverLike isOpen={confirmationOpen} handleConfirm={handleConfirm} handleCancel={handleCancel} />
    </div>
  )
}
