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
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Sign Up Now</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4">
            <label htmlFor="nomeUsuario" className="block mb-1">
              Nome usuário
            </label>
            <input
              id="nomeUsuario"
              name="nomeUsuario"
              value={formData.nomeUsuario}
              onChange={handleChange}
              className="px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Palvra-passe
            </label>
            <input
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
            <label htmlFor="confirmacaoPassword" className="block mb-1">
              Confirmar palavra-passe
            </label>
            <input
              type="password"
              id="confirmacaoPassword"
              name="confirmacaoPassword"
              value={formData.confirmacaoPassword}
              onChange={handleChange}
              className="px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Registar
          </button>
        </form>
        <p className="mt-4">
          Já tem conta?{" "}
          <Link href="/foodies/login" className="text-blue-500">
            Entrar
          </Link>
        </p>
      </main>
    </div>
  );
}
