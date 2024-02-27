import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps, router }) {
  const isHomePage = router.pathname === '/';
  const isSignUp = router.pathname === '/signup';

  if (isHomePage || isSignUp) {
    return <Component {...pageProps} />
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
