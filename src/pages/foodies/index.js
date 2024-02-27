import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
 
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-10">
      <input placeholder='Qual o alimento que tem para hoje?' className='w-full text-black h-20'>

      </input>
    </main>
  );
}