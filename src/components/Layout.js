import Footer from "./Footer"
import Header from "./Header"


export default function Layout({children}){
    return (
    <div>
        <Header/>   {/* conteudo navbar */}
        <main>{children}</main>  {/* tudo o resto */}
        <Footer/>  
    </div>
    )
}