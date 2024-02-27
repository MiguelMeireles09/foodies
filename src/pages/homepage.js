import { useState } from 'react'
import { useRouter } from 'next/router'

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
        router.push('/homepage')
        console.log('Login successful')
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      
    </main>
  );
}