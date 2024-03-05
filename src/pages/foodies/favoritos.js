import React, { useEffect, useState } from 'react';
import ProtectPage from "@/utils/hooks/protectPagesHook";
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserFavoritosPage from '@/components/favoritos/userFavoritos';
import UserReceitasCriadasPage from '@/components/favoritos/userReceitaCriada';

export default function FavoritosPage() {
  const [pagina, setPagina] = useState("Favoritos");
  const { loading: userLoading, userData } = ProtectPage();
  const [favoritos, setFavoritos] = useState([]);
  const [receitasUser, setReceitasUser] = useState([]);
  const [loadingFavoritos, setLoadingFavoritos] = useState(false);
  const [loadingReceitas, setLoadingReceitas] = useState(false);
  const router = useRouter();
 

  if (userLoading || loadingFavoritos) return (
    <div className="flex flex-col justify-center items-center h-screen pb-40">
      <img src="https://images-ext-1.discordapp.net/external/O9fOp7KHXEPsHYJZfIAl_6WlcubBa-W3qkn9QKDVCA0/https/x.yummlystatic.com/web/spinner-light-bg.gif?width=250&height=250" alt="Loading..."></img>
    </div>
  );

  const handlePageChange = (newPage) => {
    setPagina(newPage);
  };

  const renderPage = () => {
    switch (pagina) {
      case "Favoritos":
        return <UserFavoritosPage />;
      case "Receita":
        return <UserReceitasCriadasPage />;
    }
  };

  return (
    <main className="justify-center items-start text-center w-full overflow-hidden min-h-screen px-4 md:px-14 lg:px-20 xl:px-28 pt-5">
      <div className="flex justify-around items-center border-b-2 border-gray-300 ">
          <button 
            onClick={() => handlePageChange("Favoritos")}
            className={pagina === "Favoritos" ? "text-verde border-b-2 border-verde h-10 font-bold" : "h-10"}
          >
            Favoritos
          </button>
          <button
            onClick={() => handlePageChange("Receita")}
            className={pagina === "Receita" ? "text-verde border-b-2 border-verde h-10 font-bold" : "h-10"}
          >
            Receita
          </button>
        </div>
          <div>{renderPage()}</div>
    </main> 
  )
}
