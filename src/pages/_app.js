import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps, router }) {
  const isHomePage = router.pathname === '/foodies';
  const isLocalHost = router.pathname === '/';
  const isSignUp = router.pathname === '/foodies/signup';
  const islogin = router.pathname === '/foodies/login'
  const is404 = router.pathname === '/404'

 
  

  if (isHomePage || isSignUp || islogin || isLocalHost || is404) {
    return <Component {...pageProps} />
  }


  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
