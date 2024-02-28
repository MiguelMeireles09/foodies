import { useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";


export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    email: "",
    password: "",
    confirmacaoPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Cadastro bem-sucedido");
        router.push("/homepage");
      } else {
        console.error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="bg-image">
      <main className="p-24 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">LOGO</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <div className="mb-4 w-full">
            <input
              placeholder="Nome de usuário"
              id="nomeUsuario"
              name="nomeUsuario"
              value={formData.nomeUsuario}
              onChange={handleChange}
              className="px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Palavra Passe"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Confirmar palavra-passe"
              type="password"
              id="confirmacaoPassword"
              name="confirmacaoPassword"
              value={formData.confirmacaoPassword}
              onChange={handleChange}
              className="px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <button type="submit" className="bg-verde text-white font-semibold mt-3 py-2 text-bold px-10 rounded">Registar</button>
        </form>
        <Link href="/foodies/login" className="text-verde mt-4">
          Ou entrar
        </Link>
      </main>
    </div>
  );
}
