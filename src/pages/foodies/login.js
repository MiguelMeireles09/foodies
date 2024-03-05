import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("token", userData.tokenId);

        const getResponse = await fetch("/api/user/verificaToken", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${userData.tokenId}`
          }
        });

        if (getResponse.ok) {
          const responseData = await getResponse.json();
          console.log("GET request successful:", responseData);
        } else {
          console.error("GET request failed:", getResponse.status, getResponse.statusText);
        } 

        router.push({
          pathname: "/foodies/homepage",
          query: { token: userData.tokenId },
        }, "/foodies/homepage" );

        console.log("Login successful");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-image-login-signup min-h-screen ">
      <main className="relative flex flex-col items-center justify-center min-h-screen p-24">
        <img src="/images/LogoInicial.png" className="pb-2" />
        <form
          onSubmit={handleSubmit}
          className="flex md:px-40 lg:px-40 xl:px-96  flex-col items-center w-full"
        >
          <div className="mb-4 w-full">
            <input
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border   border-cinzaBorder rounded-lg text-black  px-4 py-2"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border  border-cinzaBorder rounded-lg text-black  px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-verde text-white font-semibold mt-3 py-2 text-bold px-10 rounded-lg"
          >
            Entrar
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
          {/* Exibir mensagem de erro se houver */}
        </form>
        <Link href="/foodies/signup" className="text-verde mt-4">
          Ou registar
        </Link>
        <p className="text-xl font-semibold text-center pt-10">
          &quot;O segredo está na receita -<br /> descubra-o conosco.&quot;
        </p>

        <Link
          href="/foodies/homepage"
          className="absolute bottom-0 mb-4 underline underline-offset-2"
        >
          Fazer mais tarde.
        </Link>
      </main>
    </div>
  );
}
