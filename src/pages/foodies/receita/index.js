import React, { useEffect, useState } from "react";
import ReceitaGeral from "@/components/Receita/ReceitaGeral";
import ReceitaIngrediente from "@/components/Receita/ReceitaIngredientes copy";
import ReceitaPreparo from "@/components/Receita/ReceitaPreparo";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ReceitaInfo() {
  const [pagina, setPagina] = useState("ReceitaGeral");
  const [receita, setReceita] = useState("")
  const router = useRouter();
  const { query } = router;

    const [imagemAtual, setImagemAtual] = useState('/receitainfo/Favoriteborder.svg');


    const handleTrocarImagem = () => {
      // Trocar a imagem com base na imagem atual
      if (imagemAtual === '/receitainfo/Favoriteborder.svg') {
        setImagemAtual('/receitainfo/Favorite.svg');
      } else {
        setImagemAtual('/receitainfo/Favoriteborder.svg');
      }
    };

  const handlePageChange = (newPage) => {
    setPagina(newPage);
  };

  useEffect(() => {
    if (router.isReady) {
      const tituloReceita = router.query.query
      fetchInfoReceitas(tituloReceita);
    }
  }, [router.isReady, router.query.query]);
  

  const fetchInfoReceitas = async (query) => {
    try {
      const response = await fetch(`/api/receitas/receitas?titulo=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // No need to include body for GET request
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch favorite recipes');
      }
  
      const data = await response.json();
      setReceita(data);
      console.log("data", data);
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
    }
  };
  
  // Function to render the current page based on the state
  const renderPage = () => {
    switch (pagina) {
      case "ReceitaGeral":
        return <ReceitaGeral geral={receita} />;
      case "ReceitaIngrediente":
        return <ReceitaIngrediente ingredientes={receita} />;
      case "ReceitaPreparo":
        return <ReceitaPreparo preparo={receita}/>;
    }
  };

  return (
    <div className="font-sans">
      <div className="img-bg-receita" style={{ backgroundImage: `url(${receita.fotoReceita})` }}>
        <div className="h-2/4 p-8">
          <Image src="/receitainfo/arrowBack.svg" width="40" height="40" />
        </div>
        <div className="h-2/4 flex justify-end items-end p-8">
          <Image src={imagemAtual} width="40" height="40" onClick={handleTrocarImagem} />
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div className="flex w-3/5 p-5 items-center font-extrabold text-lg">
            {receita.titulo}
          </div>
          <div className="w-2/5 p-5 flex justify-end">
          <div className="w-32 h-10 border border-#868686 rounded-2xl text-verde font-bold flex items-center justify-center gap-2 p-2" style={{fontSize: "11px", letterSpacing:"0.1px"}}>
              <Image src="/receitainfo/share.svg" width="20" height="20" />
              PARTILHAR
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center border-b-2 border-gray-300 ">
          <button 
            onClick={() => handlePageChange("ReceitaGeral")}
            className={pagina === "ReceitaGeral" ? "text-verde border-b-2 border-verde h-10 font-bold" : "h-10"}
          >
            Geral
          </button>
          <button
            onClick={() => handlePageChange("ReceitaIngrediente")}
            className={pagina === "ReceitaIngrediente" ? "text-verde border-b-2 border-verde h-10 font-bold" : "h-10"}
          >
            Ingredientes
          </button>
          <button
            onClick={() => handlePageChange("ReceitaPreparo")}
            className={pagina === "ReceitaPreparo" ? "text-verde border-b-2 border-verde h-10 font-bold" : "h-10"}
          >
            Preparo
          </button>
        </div>
        <div>{renderPage()}</div>
      </div>
    </div>
  );
}


