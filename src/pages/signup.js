import { useState } from 'react'
import Link from 'next/link'
import { Router } from 'next/router'

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {

        console.log('Cadastro bem-sucedido')
        router.push('/homepage')

      } else {

        console.error('Erro ao cadastrar usuário');

      }
    } catch (error) {

      console.error('Erro:', error)
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign Up Now</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
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
          <label htmlFor="password" className="block mb-1">Password</label>
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
          <label htmlFor="passwordConfirmation" className="block mb-1">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            className="px-3 py-2 border rounded text-black"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Sign Up</button>
      </form>
      <p className="mt-4">Already have an account? <Link href="/login" className="text-blue-500">Log in</Link></p>
    </main>
  )
}
