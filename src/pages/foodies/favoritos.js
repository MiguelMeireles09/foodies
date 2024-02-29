import CardFavoritos from "@/components/CardFavoritos";
import protectPage from "@/utils/hooks/protectPagesHook";
import { Router } from "next/router";
import { useEffect } from "react";

export default function FavoritosPage() {
  
  //calling function to protect the page 
  // to redirect if token not exist
  protectPage()


  return (
    <div>
      <div>favoritos</div>
      <CardFavoritos />
    </div>
  );
}
