import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PerfilPage() {
 
  return (
    <div>
        <div>ola perfil</div>
        <Link href="/foodies/login">Terminar Sessao</Link>
    </div>
  );
}