import CardFavoritos from "@/components/CardFavoritos";

const token = localStorage.getItem("token");
console.log("token:", token);

export default function FavoritosPage() {
  return (
    <div>
      <div>favoritos{`token:${token}`}</div>
      <CardFavoritos />
    </div>
  );
}
