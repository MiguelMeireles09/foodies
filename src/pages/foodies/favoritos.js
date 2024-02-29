import CardFavoritos from "@/components/CardFavoritos";
import  protectPage  from "@/utils/hooks/protectPagesHook";

export default function FavoritosPage() {
  //calling function to protect the page
  // to redirect if token not exist
  protectPage();

  return (
    <div>
      <div>
        <div>favoritos</div>
        <CardFavoritos />
      </div>
    </div>
  );
}
