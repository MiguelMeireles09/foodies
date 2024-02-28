import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import CardFavoritos from '@/components/CardFavoritos';

export default function FavoritosPage() {
 
  return (
    <div>
    <h1>Os teus favoritos</h1>
        <CardFavoritos/>
    </div>
  );
}