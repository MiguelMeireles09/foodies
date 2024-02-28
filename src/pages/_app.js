import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps, router }) {
  const isHomePage = router.pathname === '/foodies';
  const isLocalHost = router.pathname === '/';
  const isSignUp = router.pathname === '/foodies/signup';
  const islogin = router.pathname === '/foodies/login'

  if (isHomePage || isSignUp || islogin || isLocalHost) {
    return <Component {...pageProps} />
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
