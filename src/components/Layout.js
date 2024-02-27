import Footer from "./Footer"
import NavBar from "./NavBar"

export default function Layout({children}){
    return (
    <div>
        <NavBar/>   {/* conteudo navbar */}
        <main>{children}</main>  {/* tudo o resto */}
        <Footer/>  
    </div>
    )
}