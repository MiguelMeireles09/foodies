// pages/foodies/homepage/index.js

import Link from 'next/link';

export default function Home() {

  return (
    <div className="min-h-screen">
      <div className='text-3xl text-center py-5'>
        <Link href="/foodies/homepage/top10">
          Top 10 Receitas
        </Link>
      </div>
      <div className='text-3xl text-center py-5'>
        <Link href="/foodies/homepage/maisRapidas">
          Receitas Rápidas
        </Link>
      </div>
      <div className='text-3xl text-center py-5'>
        <Link href="/foodies/homepage/maisFaceis">
          Receitas Fáceis
        </Link>
      </div>
      <div className='text-3xl text-center py-5'>
        <Link href="/foodies/homepage/maisSaudaveis">
          Receitas Saudáveis
        </Link>
      </div>
      <div className='text-3xl text-center py-5'>
        <Link href="/foodies/homepage/maisBaratas">
          Receitas Baratas
        </Link>
      </div>
      <div className='text-3xl text-center py-5'>
        <Link href="/foodies/homepage/pratosPrincipais">
          Pratos Principais
        </Link>
      </div>
    </div>
  );   
}
