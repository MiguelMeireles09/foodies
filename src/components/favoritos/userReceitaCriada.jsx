import React, { useEffect, useState } from "react";
import ProtectPage from "@/utils/hooks/protectPagesHook";
import { useRouter } from "next/router";
import BotaoRemoverReceita from "../botoes/BotaoRemoverReceita";

export default function UserReceitasCriadasPage() {
  const [pagina, setPagina] = useState("Favoritos");
  const { loading: userLoading, userData } = ProtectPage();
  const [favoritos, setFavoritos] = useState([]);
  const [receitasUser, setReceitasUser] = useState([]);
  const [loadingFavoritos, setLoadingFavoritos] = useState(false);
  const [receita, setReceita] = useState(null);
  const [loadingReceitas, setLoadingReceitas] = useState(false);
  const router = useRouter();
  const [receitasAdmin, setReceitasAdmin] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [recipeIdToDelete, setRecipeIdToDelete] = useState(null);

  // Receitas Criadas User
  const fetchReceitas = async (idDoUsuario) => {
    setLoadingReceitas(true);
    try {
      const response = await fetch(`/api/user/receitasUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idDoUsuario }),
      });
      if (!response.ok) {
        throw new Error("Erro ao procurar receitas favoritas.");
      }
      const data = await response.json();
      setReceitasUser(data);
    } catch (error) {
      console.error("Erro a procurar receitas:", error);
    }
    setLoadingReceitas(false);
  };

  const handleImagemClick = (recipe) => {
    const receitaSelecionada = recipe.titulo;
    router.push({
      pathname: "/foodies/receita",
      query: { query: receitaSelecionada },
    });
  };

  const handleToggleTrash = (recipeId) => {

    setRecipeIdToDelete(recipeId);

    setConfirmationOpen(true);
  };

  useEffect(() => {
    if (!userLoading && userData?._id) {
      fetchReceitas(userData._id);
      fetchReceitasAdmin(userData._id);
    }
  }, [userLoading, userData]);

  const fetchReceitasAdmin = async () => {
    if (userData._id !== "65e89d257f5aa8c1d93f84bb" && userData.admin === true) {
      return;
    }
    try {
      const response = await fetch("/api/receitas/todasReceitasAdmin");
      if (!response.ok) {
        throw new Error("Falha ao buscar receitas");
      }
      const data = await response.json();
      setReceitasAdmin(data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };

  // Apagar Receita
  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/receitas/apagarReceita`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUsuario: userData._id, idReceita: recipeIdToDelete }),
      });

      if (!response.ok) {
        throw new Error('Erro ao apagar receita.');
      }
      // novo fetch receitas assim que deleta, para user ver o que aconteceu
      fetchReceitas(userData._id);

    } catch (error) {
      console.error('Erro ao apagar Receita:', error);
    }
    // Reset states after deletion
    setRecipeIdToDelete(null);
    setConfirmationOpen(false);

  }

  const handleCancel = () => {
    // Reset states on cancel
    setRecipeIdToDelete(null);
    setConfirmationOpen(false);
  };

  if (userLoading || loadingFavoritos) {
    return (
      <div className="flex flex-col justify-center items-center h-screen pb-40">
        <img src="https://images-ext-1.discordapp.net/external/O9fOp7KHXEPsHYJZfIAl_6WlcubBa-W3qkn9QKDVCA0/https/x.yummlystatic.com/web/spinner-light-bg.gif?width=250&height=250" alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <p className="text-center py-5 text-2xl 2xl:text-4xl">As tuas receitas</p>
      {receitasUser.length === 0 && (
        <div>
          Ainda não tens nenhuma receita adicionada às tuas receitas.{" "}
          <a className="text-verde font-bold" href={"/foodies/publicar"}>Adiciona-a aqui!</a>
        </div>
      )}
      <div className="flex flex-wrap pb-10">
        {receitasUser.map((recipe) => (
          <div key={recipe._id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between ">
              <div onClick={() => handleImagemClick(recipe)} className="rounded-t-2xl w-full h-40 object-cover cursor-pointer bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${recipe.fotoReceita})` }}>
                <div className="flex justify-end items-end h-full w-full">
                  <div className="m-3" onClick={(e) => { e.stopPropagation(); handleToggleTrash(recipe._id); }}>
                    <img src="/images/Trash.svg" className="w-8 h-8 m-2" />
                  </div>
                </div>
              </div>
              <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl border-t-2 border-cinza text-black">
                {recipe.titulo}
              </p>
            </div>
          </div>
        ))}
      </div>
        <div className="pb-20">
          {userData._id === "65e89d257f5aa8c1d93f84bb" && (
            <div className="text-center pb-5 text-2xl 2xl:text-4xl">Em Aprovação</div>
          )}
              <div className="flex flex-wrap">
              {userData._id === "65e89d257f5aa8c1d93f84bb" && receitasAdmin.map((receita) => (
                <div key={receita._id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
                  <div className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between border ">
                    <div onClick={() => handleImagemClick(receita)} className="rounded-t-2xl w-full h-40 object-cover cursor-pointer bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${receita.fotoReceita})` }}>
                      <div className="flex justify-end items-end h-full w-full">
                        <div className="m-3" onClick={(e) => { e.stopPropagation(); handleToggleTrash(receita._id); }}>
                          <img src="/images/Trash.svg" className="w-8 h-8 m-2" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                    <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl border-t-2 border-cinza text-black">
                      {receita.titulo}
                    </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      <BotaoRemoverReceita isOpen={confirmationOpen} handleConfirm={handleConfirm} handleCancel={handleCancel} />
    </div>
  )
}
