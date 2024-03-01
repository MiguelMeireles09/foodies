import React, { useState } from "react";
import ReceitaGeral from "@/components/ReceitaGeral";
import ReceitaIngrediente from "@/components/ReceitaIngredientes copy";
import ReceitaPreparo from "@/components/ReceitaPreparo";
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
      <button onClick={() => handlePageChange("ReceitaGeral")}>
        Receita Geral
      </button>
      <button onClick={() => handlePageChange("ReceitaIngrediente")}>
        Receita Ingrediente
      </button>
      <button onClick={() => handlePageChange("ReceitaPreparo")}>
        Receita Preparo
      </button>

      {renderPage()}
    </div>
  );
}
