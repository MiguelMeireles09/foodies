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
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <h1 className="text-3xl font-bold mb-4">LOGO</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <div className="mb-4 w-full">
            <input
              placeholder='Email'
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
              placeholder='Password'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-cinzaBorder rounded text-black  px-4 py-2 "
              required
            />
          </div>
          <button type="submit" className="bg-verde text-white font-semibold mt-3 py-2 text-bold px-10 rounded">Entrar</button>
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Exibir mensagem de erro se houver */}
        </form>
        <Link href="/foodies/signup" className="text-verde mt-4">Ou registar</Link>
        <p className="text-xl font-semibold text-center pt-10 ">"O segredo está na receita -<br /> descubra-o conosco."</p>
      </main>
    </div>
  )
}