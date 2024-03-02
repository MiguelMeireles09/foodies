import React, { useState } from "react";
import ReceitaGeral from "@/components/Receita/ReceitaGeral";
import ReceitaIngrediente from "@/components/Receita/ReceitaIngredientes copy";
import ReceitaPreparo from "@/components/Receita/ReceitaPreparo";
import Image from "next/image";

export default function ReceitaInfo() {
  const [pagina, setPagina] = useState("ReceitaGeral");

  const handlePageChange = (newPage) => {
    setPagina(newPage);
  };

  // Function to render the current page based on the state
  const renderPage = () => {
    switch (pagina) {
      case "ReceitaGeral":
        return <ReceitaGeral />;
      case "ReceitaIngrediente":
        return <ReceitaIngrediente />;
      case "ReceitaPreparo":
        return <ReceitaPreparo />;
    }
  };

  return (
    <div>
      <div className="img-bg-receita">
        <Image src="/images/arrowBack.svg" width="20" height="20" />
        <Image src="/images/heartReceita.svg" width="20" height="20" />
      </div>
      <div className="">
        <div className="flex gap-4 ">
          <button onClick={() => handlePageChange("ReceitaGeral")}>
            Geral
          </button>
          <button onClick={() => handlePageChange("ReceitaIngrediente")}>
            Ingredientes
          </button>
          <button onClick={() => handlePageChange("ReceitaPreparo")}>
            Preparo
          </button>
        </div>
        {renderPage()}
      </div>
    </div>
  );
}
