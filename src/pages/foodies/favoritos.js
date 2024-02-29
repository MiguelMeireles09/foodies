import CardFavoritos from "@/components/CardFavoritos";

export default function FavoritosPage() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  return (
    <div>
      <div>favoritos{`token:${token}`}</div>
      <CardFavoritos />
    </div>
  );
}
