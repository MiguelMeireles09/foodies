import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { router } from "next/router";

export default function MaisFaceis() {
  const [receitas, setReceitas] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Initialize current slide index
 

  const fetchReceitas = async () => {
    try {
      const response = await fetch("/api/receitas/filtrosPagInicial/maisFaceis");
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

  
  const handleImagemClick = (e) => {
    const receitaSelecionada = e.titulo;
    router.push({
      pathname: "/foodies/receita",
      query: { query: receitaSelecionada },
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "1",
        }}
      >
        <ul
          style={{ margin: "0", padding: "0", textAlign: "center" }}
          className="custom-dots"
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: function (i) {
      return <button className="slick-dot"></button>;
    },
  };

  return (
    <div>
      <div className="text-center text-2xl py-4 text-verdeClaro font-bold"></div>
      <div className="relative">
        <Slider className="w-screen" {...settings}>
          {receitas.map((e, index) => (
            <div
              key={index}
              onClick={() => handleImagemClick(e)}
              className="relative"
            >
              <img src={e.fotoReceita} className="w-full h-64 border-cinzaClaro border-t-2 border-b-2" />
            </div>
          ))}
        </Slider>
        <p className="absolute top-0 flex justify-center items-center text-white text-2xl bg-black bg-opacity-20 text-center w-full p-3 font-black">
          {/* {e.titulo} */}
          Receitas Fáceis
        </p>
      </div>
    </div>
  );
}