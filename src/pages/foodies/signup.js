import { useState } from "react"
import Link from "next/link"
import { Router, useRouter } from "next/router"
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'


export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    email: "",
    password: "",
    confirmacaoPassword: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()


    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        toast.success('Conta criada com sucesso!', { position: "top-right", theme:"colored" })
        router.push("/foodies/login")
      } else {
        toast.error('Erro ao criar Conta!', { position: "top-right", theme:"colored" })
      }
    } catch (error) {
      console.error("Erro:", error)
    }
  }
  
  return (
    <div className="bg-image-login-signup min-h-screen">
    <ToastContainer/>
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <img src="/images/FOODIES.svg" className='pb-10' width={200} height={70} />
        <form onSubmit={handleSubmit} className="flex md:px-40 lg:px-40 xl:px-96  flex-col items-center w-full">
          <div className="mb-4 w-full">
            <input
              placeholder="Nome de utilizador"
              id="nomeUsuario"
              name="nomeUsuario"
              value={formData.nomeUsuario}
              onChange={handleChange}
              className="w-full border  border-cinzaBorder rounded text-black  px-4 py-2"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border  border-cinzaBorder rounded text-black  px-4 py-2"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              placeholder="Palavra Passe"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border  border-cinzaBorder rounded text-black  px-4 py-2"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <input
              placeholder="Confirmar palavra-passe"
              type="password"
              id="confirmacaoPassword"
              name="confirmacaoPassword"
              value={formData.confirmacaoPassword}
              onChange={handleChange}
              className="w-full border  border-cinzaBorder rounded text-black  px-4 py-2"
              required
            />
          </div>
          <button type="submit" className="bg-verde text-white font-semibold mt-3 py-2 text-bold px-10 rounded">Registar</button>
        </form>
        <Link href="/foodies/login" className="text-verde mt-4">
          Ou entrar
        </Link>
        <Link href="/foodies/homepage" className="absolute bottom-0 mb-4 underline underline-offset-2">Fazer mais tarde.</Link>
      </main>
    </div>
  )
}
