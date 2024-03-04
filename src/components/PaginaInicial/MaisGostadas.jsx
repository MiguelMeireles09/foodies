// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function MaisGostadas() {
//   const [receitas, setReceitas] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0); // Initialize current slide index
 

//   const fetchReceitas = async () => {
//     try {
//       const response = await fetch("/api/receitas/filtrosPagInicial/top10Receitas");
//       if (!response.ok) {
//         throw new Error("Falha ao buscar receitas");
//       }
//       const data = await response.json();
//       setReceitas(data);
//     } catch (error) {
//       console.error("Erro ao buscar receitas:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReceitas();
//   }, []);

//   return (
//     <div>
//       <div className="text-center text-2xl py-4">Gostadas</div>
//       <div className="carousel relative">
//         {receitas.map((e, index) => (
//           <div key={index} id={`item${index + 1}`} className="carousel-item" onClick={() => setCurrentSlide(index)}>
//             <div className="relative w-full h-full">
//               <img src={e.fotoReceita} className="h-48"/>
//               <p className="absolute left-0 top-1/2 transform -translate-y-1/2 m-0 p-1 bg-black bg-opacity-50 
//               text-white text-xl w-full text-center">
//                 {e.titulo}
//               </p>
//             </div>
//           </div>
//         ))}
//         <div className="absolute bottom-2 left-0 w-full flex justify-center">
//           {receitas.map((_, index) => (
//             <Image
//               key={index}
//               width="10"
//               height="10"
//               src={index === currentSlide ? "/cardHomepage/dotselected.svg" : "/cardHomepage/dotunselected.svg"}
//               className="h-3 mx-1"
//               alt={index === currentSlide ? "selected dot" : "unselected dot"}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
