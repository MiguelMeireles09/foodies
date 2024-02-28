import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        router.push('/foodies/paginaInicial')
        console.log('Login successful')
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="bg-image">
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">E-mail</label>
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
          <label htmlFor="password" className="block mb-1">Palvra-passe</label>
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
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Entrar</button>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Exibir mensagem de erro se houver */}
      </form>
      <p className="mb-1 p-3">Nao tem conta? <Link href="/foodies/signup" className="text-blue-500">Registe-se aqui.</Link></p>
      <p className="text-2xl text-center pt-10">"O segredo está na receita -<br /> descubra-o conosco."</p>
    </main>
  </div>
  )
}