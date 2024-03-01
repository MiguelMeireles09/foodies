import CardFavoritos from "@/components/CardFavoritos";
import ProtectPage from "@/utils/hooks/protectPagesHook";
// Ensure path is correct

export default function FavoritosPage() {
  const { loading, userData } = ProtectPage();

  if (loading) return <div>Loading...</div>; // Or any loading indicator

  return (
    <div>
      <div>
        <h1>Nome Utilizador: {userData.nomeUsuario}</h1>
        <h1>Email Utilizador: {userData.email}</h1>
        <CardFavoritos />
      </div>
    </div>
  );
}
