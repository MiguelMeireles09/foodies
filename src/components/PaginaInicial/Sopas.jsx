import { useEffect, useState } from "react";
import Image from "next/image";

export default function Sopas() {
  const [receitas, setReceitas] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Initialize current slide index
 

  const fetchReceitas = async () => {
    try {
      const response = await fetch("/api/receitas/filtrosPagInicial/categoria/sopa");
      if (!response.ok) {
        throw new Error("Falha ao buscar receitas");
      }
      const data = await response.json();
      setReceitas(data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };

  useEffect(() => {
    fetchReceitas();
  }, []);

  return (
    <div>
      <div className="text-center text-2xl py-4">Sopas</div>
      <div className="carousel relative">
        {receitas.map((e, index) => (
          <div key={index} id={`item${index + 1}`} className="carousel-item" onClick={() => setCurrentSlide(index)}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <img src={e.fotoReceita} className="h-48" style={{ width: "100%", height: "100%" }} />
              <p className="absolute left-0 top-1/2 transform -translate-y-1/2 m-0 p-1 bg-black bg-opacity-50 
              text-white text-xl w-full text-center">
                {e.titulo}
              </p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-2 left-0 w-full flex justify-center">
          {receitas.map((_, index) => (
            <Image
              key={index}
              width="10"
              height="10"
              src={index === currentSlide ? "/cardHomepage/dotselected.svg" : "/cardHomepage/dotunselected.svg"}
              className="h-3 mx-1"
              alt={index === currentSlide ? "selected dot" : "unselected dot"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}