import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import '@/styles/ConfirmButton.css';


// Nao mostrar nem footer nem layout
export default function App({ Component, pageProps, router }) {
  const isHomePage = router.pathname === '/foodies';
  const isLocalHost = router.pathname === '/';
  const isSignUp = router.pathname === '/foodies/signup';
  const islogin = router.pathname === '/foodies/login'
  const is404 = router.pathname === '/404'
  const isReceita = router.pathname === '/foodies/receita'
  const isPerfil = router.pathname === '/foodies/perfil'


  if (isHomePage || isSignUp || islogin || isLocalHost || is404 ) {
    return <Component {...pageProps} />
  }

  if (isReceita || isPerfil) {
    return (
      <>
        <Component {...pageProps } />
        <Footer />
      </>
    );
  }


  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
